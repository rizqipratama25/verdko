from playwright.sync_api import sync_playwright
import redis
import json
import requests
from datetime import datetime
from dotenv import load_dotenv
import os

# Connect to Redis
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

# Load .env
load_dotenv()

while True:

    # Pop a message from the queue
    result = r.brpop('laravel-database-scraper_queue', timeout=5)
    
    # Check if the result is None
    if result is None:
        print("No job yet...")
        continue
    
    # Extract the payload from the result
    _, payload = result

    # Decode the payload
    product = json.loads(payload)

    # Print the product details
    print(product)

    print(product["id"])
    print(product["name"])
    print(product["product_url"])

    with sync_playwright() as p:
        # Launch a new browser instance
        browser = p.chromium.launch(headless=False)
        
        # Create a new page
        page = browser.new_page()
        
        # Navigate to the product URL
        page.goto(product["product_url"])
        
        # Get the price of the product
        price_element = page.locator(".price")
        
        # Extract the price from the element
        price_text = price_element.inner_text()
        
        # Remove the currency symbol and decimal point
        clean_price = price_text.replace("Rp", "").replace(".", "")
        
        # Convert the cleaned price to an integer
        price = int(clean_price)
            
        # Set the headers for the API requests
        headers = {
            "X-Scraper-Key": os.getenv("SCRAPER_API_KEY"),
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
        
        print("Ini key nya", os.getenv("SCRAPER_API_KEY"))
        
        # Send a POST request to the monitoring-results endpoint with the product ID, price, and detected_at
        endpoint_url = "http://127.0.0.1:8000/api/monitoring-results"
        payload = {
            "monitored_product_id": product["id"],
            "price": price,
            "detected_at": datetime.now().isoformat()
        }
        response = requests.post(endpoint_url, json=payload, headers=headers)
        
        # Check if the request was successful
        print("Status: ", response.status_code)
        print("Response: ", response.json())
        
        
    
    