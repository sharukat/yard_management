from pyexpat import model
from .models import Containers, Customers, Vessels
from rest_framework import serializers

class ContainerInSerializer(serializers.ModelSerializer):
    class Meta:
        model = Containers
        fields =[
            'container_id', 'serial_no', 'customer', 'type', 'size', 'status', 'condition', 'p_condition','rsv',
            'consignee', 'date_in', 'time_in','vehicle_in', 'ex_vessel', 'vessel', 'p_location', 'c_location','voyage', 'bl_number','arr_date','s_code']

class VesselSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vessels
        fields = ['vessel']

class CustomersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customers
        fields = ['customer']

class ContainerCheckSerializer(serializers.ModelSerializer):
    class Meta:
        model = Containers
        fields = ['container_id','serial_no']