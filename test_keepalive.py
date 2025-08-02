"""
Test script for Render keep-alive service
Run this locally to test the keep-alive functionality
"""
import os
import sys
import time
import requests
from datetime import datetime

# Add the project root to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Set Django settings
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

import django
django.setup()

def test_keep_alive_service():
    """Test the keep-alive service functionality"""
    
    print("🧪 Testing Render Keep-Alive Service")
    print("=" * 50)
    
    # Test 1: Import the service
    try:
        from backend.render_keepalive import RenderKeepAliveService
        print("✅ Keep-alive service imported successfully")
    except ImportError as e:
        print(f"❌ Failed to import keep-alive service: {e}")
        return
    
    # Test 2: Create service instance
    try:
        service = RenderKeepAliveService()
        print(f"✅ Service instance created")
        print(f"   Target URL: {service.base_url}")
        print(f"   Ping interval: {service.ping_interval/60} minutes")
    except Exception as e:
        print(f"❌ Failed to create service instance: {e}")
        return
    
    # Test 3: Test service status
    try:
        status = service.get_status()
        print("✅ Service status retrieved:")
        for key, value in status.items():
            print(f"   {key}: {value}")
    except Exception as e:
        print(f"❌ Failed to get service status: {e}")
    
    # Test 4: Test health endpoints (if server is running)
    test_urls = [
        "http://127.0.0.1:8000/api/health/",
        "http://127.0.0.1:8000/api/status/", 
        "http://127.0.0.1:8000/api/keep-alive/"
    ]
    
    print("\n🌐 Testing health endpoints...")
    for url in test_urls:
        try:
            response = requests.get(url, timeout=5)
            if response.status_code == 200:
                print(f"✅ {url} - OK")
            else:
                print(f"⚠️ {url} - Status {response.status_code}")
        except requests.exceptions.ConnectionError:
            print(f"🔌 {url} - Server not running (expected if testing without server)")
        except Exception as e:
            print(f"❌ {url} - Error: {e}")
    
    # Test 5: Test ping functionality (simulation)
    print("\n🏓 Testing ping functionality...")
    try:
        # This will fail if server isn't running, but tests the method
        service.send_keep_alive_ping()
        print("✅ Ping method executed (may have failed due to no server)")
    except Exception as e:
        print(f"🔌 Ping test failed (expected without running server): {e}")
    
    print("\n" + "=" * 50)
    print("🎉 Keep-alive service test completed!")
    print("\n📝 Next steps:")
    print("1. Start your Django server: python manage.py runserver")
    print("2. Visit: http://127.0.0.1:8000/api/health/")
    print("3. Deploy to Render with environment variables set")
    print("4. Monitor logs for keep-alive activity")

if __name__ == "__main__":
    test_keep_alive_service()
