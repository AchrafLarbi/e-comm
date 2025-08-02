"""
Render Keep-Alive Service
Prevents Render free tier from spinning down due to inactivity
"""
import os
import time
import requests
import threading
import logging
from datetime import datetime, timedelta
from django.conf import settings

logger = logging.getLogger(__name__)

class RenderKeepAliveService:
    """
    Service to keep Render deployment active by sending periodic requests
    """
    
    def __init__(self):
        self.is_active = True
        self.ping_interval = 14 * 60  # 14 minutes (Render spins down after 15 min)
        self.base_url = self.get_deployment_url()
        self.last_ping_time = None
        self.ping_thread = None
        self.ping_count = 0
        
    def get_deployment_url(self):
        """Get the deployment URL from environment or settings"""
        # Try to get from environment variables
        render_url = os.environ.get('RENDER_EXTERNAL_URL')
        if render_url:
            return render_url
            
        # Fallback to common Render URL pattern
        app_name = os.environ.get('RENDER_SERVICE_NAME', 'django-app')
        return f"https://{app_name}.onrender.com"
    
    def start_keep_alive(self):
        """Start the keep-alive ping service"""
        if self.ping_thread and self.ping_thread.is_alive():
            logger.info("Keep-alive service already running")
            return
            
        def ping_loop():
            logger.info(f"🚀 Render keep-alive service started")
            logger.info(f"📍 Target URL: {self.base_url}")
            logger.info(f"⏰ Ping interval: {self.ping_interval/60} minutes")
            
            while self.is_active:
                try:
                    self.send_keep_alive_ping()
                    time.sleep(self.ping_interval)
                except Exception as e:
                    logger.error(f"Keep-alive ping failed: {e}")
                    # Wait shorter time on error and retry
                    time.sleep(60)
        
        self.ping_thread = threading.Thread(target=ping_loop, daemon=True)
        self.ping_thread.start()
        logger.info("✅ Render keep-alive thread started")
    
    def send_keep_alive_ping(self):
        """Send a keep-alive ping to prevent spin-down"""
        try:
            ping_url = f"{self.base_url}/api/keep-alive/"
            
            response = requests.get(
                ping_url,
                timeout=30,
                headers={
                    'User-Agent': 'Render-KeepAlive-Service/1.0',
                    'X-Keep-Alive': 'true'
                }
            )
            
            self.ping_count += 1
            self.last_ping_time = datetime.now()
            
            if response.status_code == 200:
                logger.info(f"✅ Keep-alive ping #{self.ping_count} successful at {self.last_ping_time.strftime('%H:%M:%S')}")
            else:
                logger.warning(f"⚠️ Keep-alive ping returned status {response.status_code}")
                
        except requests.exceptions.Timeout:
            logger.warning("⏰ Keep-alive ping timed out (service might be spinning up)")
        except requests.exceptions.ConnectionError:
            logger.warning("🔌 Keep-alive ping connection failed (service might be down)")
        except Exception as e:
            logger.error(f"❌ Keep-alive ping error: {e}")
    
    def stop_keep_alive(self):
        """Stop the keep-alive service"""
        self.is_active = False
        logger.info("🛑 Render keep-alive service stopped")
    
    def get_status(self):
        """Get current keep-alive service status"""
        return {
            'active': self.is_active,
            'ping_count': self.ping_count,
            'last_ping': self.last_ping_time.isoformat() if self.last_ping_time else None,
            'target_url': self.base_url,
            'ping_interval_minutes': self.ping_interval / 60,
            'next_ping_in_seconds': self.ping_interval - (time.time() % self.ping_interval) if self.last_ping_time else 0
        }

# Global instance
render_keep_alive = RenderKeepAliveService()

def start_render_keep_alive():
    """Start the Render keep-alive service"""
    # Only start if we're likely on Render (has RENDER_EXTERNAL_URL)
    if os.environ.get('RENDER_EXTERNAL_URL') or os.environ.get('RENDER_SERVICE_NAME'):
        render_keep_alive.start_keep_alive()
        return True
    return False
