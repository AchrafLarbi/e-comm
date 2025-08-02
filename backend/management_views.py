"""
Backend management views for health checks and status monitoring
"""
from django.http import JsonResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.cache import never_cache
import time
import psutil
import os
import sys
from django.conf import settings

# Import render keep-alive service
try:
    from .render_keepalive import render_keep_alive
except ImportError:
    render_keep_alive = None


@method_decorator([csrf_exempt, never_cache], name='dispatch')
class HealthCheckView(View):
    """
    Health check endpoint for monitoring backend status
    """
    
    def get(self, request):
        """Return detailed health status"""
        try:
            # System information
            memory = psutil.virtual_memory()
            cpu_percent = psutil.cpu_percent(interval=1)
            
            health_data = {
                'status': 'healthy',
                'timestamp': time.time(),
                'server_info': {
                    'python_version': sys.version,
                    'django_version': getattr(settings, 'DJANGO_VERSION', 'Unknown'),
                    'pid': os.getpid(),
                },
                'system_info': {
                    'memory_usage': {
                        'total': memory.total,
                        'available': memory.available,
                        'used': memory.used,
                        'percentage': memory.percent
                    },
                    'cpu_usage': cpu_percent,
                },
                'application_info': {
                    'debug_mode': settings.DEBUG,
                    'database_connected': self.check_database_connection(),
                    'static_files_accessible': self.check_static_files(),
                    'render_deployment': self.is_render_deployment(),
                    'render_keep_alive': self.get_render_keep_alive_status(),
                }
            }
            
            return JsonResponse(health_data)
            
        except Exception as e:
            return JsonResponse({
                'status': 'unhealthy',
                'error': str(e),
                'timestamp': time.time()
            }, status=500)
    
    def check_database_connection(self):
        """Check if database is accessible"""
        try:
            from django.db import connection
            cursor = connection.cursor()
            cursor.execute("SELECT 1")
            return True
        except Exception:
            return False
    
    def check_static_files(self):
        """Check if static files are accessible"""
        try:
            static_root = getattr(settings, 'STATIC_ROOT', None)
            if static_root and os.path.exists(static_root):
                return True
            return False
        except Exception:
            return False
    
    def is_render_deployment(self):
        """Check if running on Render"""
        return bool(os.environ.get('RENDER_EXTERNAL_URL') or os.environ.get('RENDER_SERVICE_NAME'))
    
    def get_render_keep_alive_status(self):
        """Get Render keep-alive service status"""
        if render_keep_alive and self.is_render_deployment():
            return render_keep_alive.get_status()
        return None


@method_decorator([csrf_exempt, never_cache], name='dispatch')
class StatusView(View):
    """
    Simple status endpoint for quick checks
    """
    
    def get(self, request):
        """Return simple status"""
        return JsonResponse({
            'status': 'running',
            'message': 'Backend server is active',
            'timestamp': time.time()
        })


@method_decorator([csrf_exempt, never_cache], name='dispatch')
class KeepAliveView(View):
    """
    Keep-alive endpoint to maintain server activity
    """
    
    def get(self, request):
        """Handle keep-alive requests"""
        response_data = {
            'status': 'alive',
            'message': 'Server is active and responding',
            'timestamp': time.time(),
            'uptime': time.time() - getattr(settings, 'SERVER_START_TIME', time.time())
        }
        
        # Add Render-specific information
        if os.environ.get('RENDER_EXTERNAL_URL'):
            response_data['render_info'] = {
                'deployment_url': os.environ.get('RENDER_EXTERNAL_URL'),
                'service_name': os.environ.get('RENDER_SERVICE_NAME', 'unknown'),
                'keep_alive_active': render_keep_alive.is_active if render_keep_alive else False
            }
        
        return JsonResponse(response_data)
    
    def post(self, request):
        """Handle keep-alive ping requests"""
        return JsonResponse({
            'status': 'pong',
            'message': 'Keep-alive received',
            'timestamp': time.time()
        })
