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
        
def scrape_product(scraper_key, endpoint_url, product):
    browser = None
    
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=False)
            page = browser.new_page()
            
            page.goto(
                product["product_url"],
                timeout=60000,
                wait_until="domcontentloaded",
            )
            
            price_element = page.locator(".price")
            price_element.wait_for(timeout=15000)
            
            price_text = price_element.inner_text()
            
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
        if browser:
            browser.close()

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
    
    while True:
        try:
            result = r.brpop("laravel-database-scraper_queue", timeout=5)
            
            if result is None:
                print("No job yet...")
                continue
            
            _, payload = result
            product = json.loads(payload)
            
            print("Processing:", product)
            
            scrape_product(SCRAPER_KEY, SCRAPER_URL, product)

        except Exception as e:
            print("Worker loop error:", str(e))
            time.sleep(3)
            continue

if __name__ == "__main__":
    main()
