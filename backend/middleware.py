"""
Middleware for backend management and keep-alive functionality
"""
import time
import threading
from django.http import JsonResponse
from django.utils.deprecation import MiddlewareMixin
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

class BackendKeepAliveMiddleware(MiddlewareMixin):
    """
    Middleware to keep the backend alive and manage server lifecycle
    """
    
    def __init__(self, get_response):
        self.get_response = get_response
        self.last_request_time = time.time()
        self.is_active = True
        self.request_count = 0
        
        # Start background keep-alive thread
        self.start_keep_alive_thread()
        super().__init__(get_response)
    
    def start_keep_alive_thread(self):
        """Start a background thread to keep the server alive"""
        def keep_alive():
            while self.is_active:
                try:
                    current_time = time.time()
                    # Update last activity time
                    if current_time - self.last_request_time > 300:  # 5 minutes
                        logger.info("Backend keep-alive: Server still running, no recent requests")
                    
                    # Sleep for 30 seconds before next check
                    time.sleep(30)
                    
                except Exception as e:
                    logger.error(f"Keep-alive thread error: {e}")
                    
        thread = threading.Thread(target=keep_alive, daemon=True)
        thread.start()
        logger.info("Backend keep-alive thread started")
    
    def process_request(self, request):
        """Process incoming requests and update activity"""
        self.last_request_time = time.time()
        self.request_count += 1
        
        # Add request metadata
        request.backend_start_time = time.time()
        
        return None
    
    def process_response(self, request, response):
        """Process response and add performance headers"""
        if hasattr(request, 'backend_start_time'):
            processing_time = time.time() - request.backend_start_time
            response['X-Backend-Processing-Time'] = f"{processing_time:.3f}s"
            response['X-Backend-Request-Count'] = str(self.request_count)
            response['X-Backend-Status'] = 'active'
        
        return response


class HealthCheckMiddleware(MiddlewareMixin):
    """
    Middleware to handle health check requests
    """
    
    def process_request(self, request):
        """Handle health check requests"""
        if request.path == '/health/' or request.path == '/api/health/':
            return JsonResponse({
                'status': 'healthy',
                'timestamp': time.time(),
                'server': 'Django Backend',
                'version': '1.0.0'
            })
        
        return None


class CORSAndSecurityMiddleware(MiddlewareMixin):
    """
    Enhanced CORS and security middleware
    """
    
    def process_response(self, request, response):
        """Add CORS and security headers"""
        # CORS headers for frontend communication
        response['Access-Control-Allow-Origin'] = getattr(settings, 'FRONTEND_URL', 'http://localhost:3000')
        response['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
        response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Requested-With'
        response['Access-Control-Allow-Credentials'] = 'true'
        
        # Security headers
        response['X-Content-Type-Options'] = 'nosniff'
        response['X-Frame-Options'] = 'DENY'
        response['X-XSS-Protection'] = '1; mode=block'
        
        return response
