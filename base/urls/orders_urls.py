from django.urls import path
from ..views import users_views,orders_views,products_views



urlpatterns=[
    path('all/',orders_views.getAllOrders,name='get_all_orders'),
    path('add/',orders_views.addOrderItems,name='add_order_items'),
    path('myorders/',orders_views.getMyOrders,name='my_orders'),
    path('<str:pk>/deliver/',orders_views.updateOrderToDelivered,name='update_order_to_delivered'),
    path('<str:pk>/',orders_views.getOrderById,name='get_order_by_id'),
    path('create-payment/<int:pk>/', orders_views.create_paypal_payment_view, name='create_paypal_payment'),
    path('<str:pk>/pay/paypal/',orders_views.execute_paypal_payment, name='pay_order'),
]
    
    
