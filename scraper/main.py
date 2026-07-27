from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeoutError
import redis
import json
import requests
from datetime import datetime, timezone
from dotenv import load_dotenv
import os
import time
import sys

def send_failed_result(scraper_key, endpoint_url, product_id, reason):
    payload = {
        "monitored_product_id": product_id,
        "status": "failed",
        "error_message": reason,
        "detected_at": datetime.now(timezone.utc).isoformat(),
    }
    
    headers = {
        "X-Scraper-Key": scraper_key,
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
    
    try:
        response = requests.post(endpoint_url, json=payload, headers=headers, timeout=15)
        print("Failed result sent:", response.status_code)
    except Exception as e:
        print("Failed to report error to Laravel:", str(e))
        
def scrape_product(browser, scraper_key, endpoint_url, product):
    # Buat context baru untuk setiap produk agar cookies/cache tidak menumpuk
    context = None
    
    try:
        target_url = product["product_url"]
        
        if "tk.tokopedia.com" in target_url:
            try:
                headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
                response_resolve = requests.head(target_url, allow_redirects=True, headers=headers, timeout=10)
                target_url = response_resolve.url
                print("Resolved URL:", target_url)
            except Exception as e:
                print("Failed to resolve URL:", str(e))
        
        # Samarkan User-Agent agar tidak terlihat seperti headless robot
        user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
        
        context = browser.new_context(
            user_agent=user_agent,
            viewport={"width": 1280, "height": 720},
            device_scale_factor=1,
            is_mobile=False,
            has_touch=False,
            locale="id-ID",
            timezone_id="Asia/Jakarta",
            java_script_enabled=True,
            # Tambahkan header tambahan agar menyerupai navigasi user asli
            extra_http_headers={
                "sec-ch-ua": '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": '"Windows"',
                "upgrade-insecure-requests": "1",
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
                "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
            }
        )
        
        page = context.new_page()
        
        # --- BLOK PENYAMARAN STEALTH TINGKAT LANJUT ---
        # 1. Menghapus jejak webdriver otomatis
        page.add_init_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
        
        # 2. Meniru objek windows.chrome milik browser asli
        page.add_init_script("""
            window.chrome = {
                runtime: {},
                loadTimes: function() {},
                csi: function() {},
                app: {}
            };
        """)
        
        # 3. Mengelabui bahasa default sistem target agar sinkron
        page.add_init_script("""
            Object.defineProperty(navigator, 'languages', {
                get: () => ['id-ID', 'id', 'en-US', 'en'],
            });
        """)
        
        # 4. Memalsukan WebGL vendor agar tidak terdeteksi sebagai "Mesa" atau "Headless"
        page.add_init_script("""
            const getParameter = WebGLRenderingContext.prototype.getParameter;
            WebGLRenderingContext.prototype.getParameter = function(parameter) {
                // UNMASKED_VENDOR_WEBGL
                if (parameter === 37445) {
                    return "Intel Inc.";
                }
                // UNMASKED_RENDERER_WEBGL
                if (parameter === 37446) {
                    return "Intel(R) Iris(R) Xe Graphics";
                }
                return getParameter.call(this, parameter);
            };
        """)

        response = page.goto(
            target_url,
            timeout=60000,
            wait_until="domcontentloaded"
        )
        
        print("Response",response)
        
        page.wait_for_timeout(2000)
        
        price_element = page.locator('[data-testid="lblProductDetailPrice"], [data-testid="price"], .price')
        price_element.first.wait_for(timeout=20000)
        
        price_text = price_element.first.inner_text()
        
        clean_price = (
            price_text
            .replace("Rp", "")
            .replace(".", "")
            .replace(",", "")
            .strip()
        )
        
        price = int(clean_price)
        
        payload = {
            "monitored_product_id": product["id"],
            "price": price,
            "status": "success",
            "detected_at": datetime.now(timezone.utc).isoformat(),
        }
        
        headers = {
            "X-Scraper-Key": scraper_key,
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
        
        response = requests.post(endpoint_url, json=payload, headers=headers, timeout=15)
        
        print("Status:", response.status_code)
        print("Response:", response.text)
            
    except PlaywrightTimeoutError as e:
        print("Timeout scraping product:", product["id"])
        send_failed_result(scraper_key, endpoint_url, product["id"], "Page timeout")
        
    except Exception as e:
        print("Scraping failed:", str(e))
        send_failed_result(scraper_key, endpoint_url, product["id"], str(e))
        
    finally:
        if context:
            context.close() # Tutup tab/context saja, jangan tutup browsernya

def main():
    load_dotenv()
    
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")
    
    r = redis.Redis(
        host="127.0.0.1",
        port=6379,
        db=0,
        decode_responses=True,
        socket_timeout=None,
        socket_connect_timeout=10,
        health_check_interval=30,
    )
    
    print("Connected to Redis")
    
    SCRAPER_KEY = os.getenv("SCRAPER_KEY")
    SCRAPER_URL = os.getenv("SCRAPER_URL")
    
    if not SCRAPER_KEY or not SCRAPER_URL:
        raise ValueError("SCRAPER_KEY or SCRAPER_URL is missing in .env")
    
    # Bungkus loop utama di dalam satu session Playwright
    with sync_playwright() as p:
        # Argumen tambahan untuk menyamarkan status headless di Chromium
        browser = p.chromium.launch(
            headless=True,
            args=[
                "--disable-blink-features=AutomationControlled",
                "--use-fake-ui-for-media-stream",
                "--window-size=1280,720",
                "--disable-http2",
                "--disable-extensions",
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-infobars",
                "--lang=id-ID",
            ]
        )
        print("Playwright browser successfully started in headless mode.")
    
        while True:
            try:
                result = r.brpop("laravel-database-scraper_queue", timeout=5)
                
                if result is None:
                    print("No job yet...")
                    continue
                
                _, payload = result
                product = json.loads(payload)
                
                print("Processing:", product)
                
                # Oper instance browser ke fungsi scraper
                scrape_product(browser, SCRAPER_KEY, SCRAPER_URL, product)

            except Exception as e:
                print("Worker loop error:", str(e))
                time.sleep(3)
                continue

if __name__ == "__main__":
    main()
