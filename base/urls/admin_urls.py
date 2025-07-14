from django.urls import path
from ..views import orders_views, users_views, products_views

# Admin-only URL patterns
urlpatterns = [
    # Admin Orders Management
    path('orders/', orders_views.getAllOrders, name='admin_get_all_orders'),
    path('orders/<str:pk>/', orders_views.getOrderByIdAdmin, name='admin_get_order_by_id'),
    path('orders/<str:pk>/pay/', orders_views.updateOrderToPaid, name='admin_update_order_to_paid'),
    path('orders/<str:pk>/deliver/', orders_views.updateOrderToDelivered, name='admin_update_order_to_delivered'),
    
    # Admin Users Management
    path('users/', users_views.getUsers, name='admin_get_all_users'),
    path('users/<str:pk>/', users_views.getUserById, name='admin_get_user_by_id'),
    path('users/<str:pk>/update/', users_views.updateUser, name='admin_update_user'),
    path('users/<str:pk>/delete/', users_views.deleteUser, name='admin_delete_user'),
    
    # Admin Products Management  
    path('products/', products_views.getProducts, name='admin_get_all_products'),
    path('products/create/', products_views.createProduct, name='admin_create_product'),
    path('products/<str:pk>/', products_views.getProduct, name='admin_get_product'),
    path('products/<str:pk>/update/', products_views.updateProduct, name='admin_update_product'),
    path('products/<str:pk>/delete/', products_views.deleteProduct, name='admin_delete_product'),
    path('products/<str:pk>/upload/', products_views.uploadImage, name='admin_upload_product_image'),
]
