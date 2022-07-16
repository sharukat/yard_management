from pyexpat import model
from .models import Containers, Customers, Vessels
from rest_framework import serializers

class ContainerInSerializer(serializers.ModelSerializer):
    class Meta:
        model = Containers
        fields =[
            'container_id', 'serial_no', 'customer', 'type', 'size', 'status', 'condition', 
            'consignee', 'date_in', 'time_in','vehicle_in', 'ex_vessel']

class VesselSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vessels
        fields = ['vessel']

class CustomersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customers
        fields = ['customer']