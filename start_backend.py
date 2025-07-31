#!/usr/bin/env python
"""
Enhanced Django server startup script with keep-alive functionality
"""
import os
import sys
import signal
import time
import threading
from pathlib import Path

# Add the project root to Python path
BASE_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(BASE_DIR))

# Set Django settings module
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

import django
from django.core.management import execute_from_command_line
from django.conf import settings

class BackendManager:
    """Manages Django backend server with keep-alive functionality"""
    
    def __init__(self):
        self.is_running = True
        self.server_process = None
        self.keep_alive_thread = None
        
    def start_keep_alive_monitor(self):
        """Start a thread to monitor server health"""
        def monitor():
            import requests
            import time
            
            while self.is_running:
                try:
                    # Wait for server to start
                    time.sleep(10)
                    
                    # Try to ping the health endpoint
                    response = requests.get('http://127.0.0.1:8000/api/health/', timeout=5)
                    if response.status_code == 200:
                        print(f"✅ Backend health check passed at {time.strftime('%Y-%m-%d %H:%M:%S')}")
                    else:
                        print(f"⚠️ Backend health check failed with status {response.status_code}")
                        
                except Exception as e:
                    print(f"❌ Backend health check error: {e}")
                
                # Wait 30 seconds before next check
                time.sleep(30)
        
        self.keep_alive_thread = threading.Thread(target=monitor, daemon=True)
        self.keep_alive_thread.start()
        print("🔄 Backend health monitor started")
    
    def signal_handler(self, signum, frame):
        """Handle shutdown signals gracefully"""
        print(f"\n🛑 Received signal {signum}. Shutting down gracefully...")
        self.is_running = False
        
        if self.server_process:
            self.server_process.terminate()
        
        print("✅ Backend server stopped")
        sys.exit(0)
    
    def start_server(self):
        """Start the Django development server"""
        # Setup signal handlers
        signal.signal(signal.SIGINT, self.signal_handler)
        signal.signal(signal.SIGTERM, self.signal_handler)
        
        print("🚀 Starting Django backend server...")
        print(f"📍 Project directory: {BASE_DIR}")
        print(f"⚙️ Settings module: {os.environ.get('DJANGO_SETTINGS_MODULE')}")
        print(f"🌐 Server will be available at: http://127.0.0.1:8000")
        print(f"💊 Health check endpoint: http://127.0.0.1:8000/api/health/")
        print("─" * 60)
        
        # Initialize Django
        django.setup()
        
        # Start health monitor
        self.start_keep_alive_monitor()
        
        # Start Django server
        try:
            execute_from_command_line([
                'manage.py', 
                'runserver', 
                '0.0.0.0:8000',
                '--noreload' if '--noreload' in sys.argv else '--noreload'
            ])
        except KeyboardInterrupt:
            self.signal_handler(signal.SIGINT, None)
        except Exception as e:
            print(f"❌ Server startup error: {e}")
            sys.exit(1)

def main():
    """Main entry point"""
    manager = BackendManager()
    manager.start_server()

if __name__ == "__main__":
    main()
