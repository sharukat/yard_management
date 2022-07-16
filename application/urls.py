from django.urls import path
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    
    #path('container_in/', TemplateView.as_view(template_name='templates/container_in.html'), name='container_in_page'),
    path('container_in/', views.containerIn, name='container_in'), 
    path('vessels/', views.filterVessel, name='vessels'),
    path('customers/', views.filterCustomers, name='customers'),
]