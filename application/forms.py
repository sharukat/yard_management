from dataclasses import fields
from pyexpat import model
from django.forms import ModelForm
from .models import Containers

class ContainerInForm(ModelForm):
    class Meta:
        model = Containers
        fields = ['container_id', 'serial_no', 'customer', 'type', 'status', 'condition', 'consignee', 'vehicle_in', 'ex_vessel', 'shipper', 'vehicle_out', 'to_vessel', 'reference', 'status_out', 'condition_out', 'date_out', 'time_out']