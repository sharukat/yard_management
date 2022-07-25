from pyexpat import model
from .models import Containers, Customers, Vessels
from rest_framework import serializers

class ContainerInSerializer(serializers.ModelSerializer):
    class Meta:
        time_in = serializers.TimeField(format='%H:%M:%S', input_formats=['%H:%M:%S'])
        model = Containers
        fields =[
            'container_id', 'serial_no', 'customer', 'type', 'size', 'status', 'condition', 'p_condition','rsv',
            'consignee', 'date_in', 'time_in','vehicle_in', 'ex_vessel', 'vessel', 'p_location', 'c_location','voyage', 'bl_number','arr_date','s_code']


class ContainerOutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Containers
        fields =[
            'container_id','serial_no','rel_order', 'vehicle_out', 'shipper', 'status_out', 'condition_out', 'to_vessel', 'p_location', 'c_location','reference', 'driver', 'nic']


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

class ContainerReserveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Containers
        fields = ['container_id','serial_no','reserved_to','reservation_date']