"""
Management URLs for backend monitoring and keep-alive functionality
"""
from django.urls import path
from .management_views import HealthCheckView, StatusView, KeepAliveView

urlpatterns = [
    path('health/', HealthCheckView.as_view(), name='health_check'),
    path('status/', StatusView.as_view(), name='status_check'),
    path('keep-alive/', KeepAliveView.as_view(), name='keep_alive'),
    path('ping/', KeepAliveView.as_view(), name='ping'),
]
