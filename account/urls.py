#from django.conf.urls import url
from knox import views as knox_views
from django.urls import path, include
from rest_framework.authtoken import views
from account.views import UserRegistrationAPI, UserLoginAPI, ChangePasswordAPI

# ==========================================================================================

urlpatterns = [
    path('api/register/'		, UserRegistrationAPI.as_view()		, name='register'),
    path('api/login/'			, UserLoginAPI.as_view()			, name='login'),
    path('api/logout/'			, knox_views.LogoutView.as_view()	, name='logout'),
    path('api/logoutall/'		, knox_views.LogoutAllView.as_view(), name='logoutall'),
    path('api/change-password/'	, ChangePasswordAPI.as_view()		, name='change-password'),
]