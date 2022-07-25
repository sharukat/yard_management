from django.urls import path
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    
    #path('container_in/', TemplateView.as_view(template_name='templates/container_in.html'), name='container_in_page'),
    path('container_in/', views.containerIn, name='container_in'), 
    path('vessels/', views.filterVessel, name='vessels'),
    path('customers/', views.filterCustomers, name='customers'),
    path('container_check/', views.checkContainer, name='container_check'),
    path('get_vessel/', views.getVessel, name='get_vessel'),
    path('get_customer/', views.getCustomer, name='get_customer'),
    path('container_out/', views.containerOut, name='container_out'),
    path('reservation_check/', views.checkReservation, name='reservation_check'),
    path('reserve/', views.containerReserve, name='reserve'),
]