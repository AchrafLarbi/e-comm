"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
urlpatterns = [
    path("admin/", admin.site.urls),
    # Admin-only API routes
    path("api/admin/", include('base.urls.admin_urls')),
    
    # Regular user API routes
    path("api/users/",include('base.urls.users_urls')),
    path("api/products/",include('base.urls.products_urls')),
    path("api/orders/",include('base.urls.orders_urls')),
    
    # Backend management and monitoring routes
    path("api/", include('backend.management_urls')),
    # this to make react app as the main template for the project
    # and render the index.html file # setup static files and templates in settings.py 
    # path ('',TemplateView.as_view(template_name='index.html')),
    
]
# set up media url# that means we can access media files from this url
urlpatterns+=static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
