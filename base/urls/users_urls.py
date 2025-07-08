from django.urls import path
from ..views import users_views,orders_views,products_views



# 
urlpatterns=[
    path('',users_views.getUsers,name="users"),
    # for jwt token authentication
    path('login/', users_views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/update/',users_views.updateUserProfile,name="user-profile-update"),
    path('register/',users_views.registerUser,name="register"),
    path('delete/<str:pk>/',users_views.deleteUser,name="delete-user"),
    # two versions of get user profile 
    
    path('profile/',users_views.getUserProfile,name="user-profile"), #for authenticated user
    path('user/<str:pk>/',users_views.getUserById,name="user"), #for admin
    path('update/<str:pk>/',users_views.updateUser,name="update-user"),
    
    
    
]