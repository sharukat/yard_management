from django.db import models

# Create your models here.

class Containers(models.Model):

    # Container In Form Fields
    container_id = models.CharField(max_length=100, null=False, blank=False)
    serial_no   = models.CharField(max_length=100, null=False, blank=False)
    customer    = models.CharField(max_length=100, null=False, blank=False)
    type        = models.CharField(max_length=100, null=False, blank=False)
    size        = models.CharField(max_length=100, null=False, blank=False)
    status      = models.CharField(max_length=100)
    condition   = models.CharField(max_length=100)
    consignee   = models.CharField(max_length=100)
    date_in     = models.DateField(auto_now_add=True)
    time_in     = models.TimeField(auto_now_add=True)
    vehicle_in  = models.CharField(max_length=100, null=True, blank=True)
    ex_vessel   = models.CharField(max_length=100, null=True, blank=True)
    vessel      = models.CharField(max_length=100, null=True, blank=True)
    p_location  = models.CharField(max_length=100, null=True, blank=True)
    c_location  = models.CharField(max_length=100, null=True, blank=True)
    voyage      = models.CharField(max_length=100, null=True, blank=True)
    bl_number   = models.CharField(max_length=100, null=True, blank=True)
    p_condition = models.CharField(max_length=100, null=True, blank=True)
    
    # Container Out Form Fields
    shipper     = models.CharField(max_length=100, null=True, blank=True)
    vehicle_out = models.CharField(max_length=100, null=True, blank=True)
    to_vessel   = models.CharField(max_length=100, null=True, blank=True)
    reference   = models.CharField(max_length=100, null=True, blank=True)
    status_out  = models.CharField(max_length=100, null=True, blank=True)
    condition_out = models.CharField(max_length=100, null=True, blank=True)
    date_out    = models.DateField(auto_now_add=False, null=True, blank=True)
    time_out    = models.TimeField(auto_now_add=False, null=True, blank=True)
    rel_order   = models.CharField(max_length=100, null=True, blank=True)

    # Other
    arr_date    = models.DateField(auto_now_add=False, null=True, blank=True)
    to_date     = models.DateField(auto_now_add=True)
    off_date    = models.DateField(auto_now_add=False, null=True, blank=True)
    off_hire    = models.CharField(max_length=100, null=True, blank=True)
    st_out      = models.CharField(max_length=100, null=True, blank=True)
    rep_date    = models.CharField(max_length=100, null=True, blank=True)
    amount      = models.CharField(max_length=100, null=True, blank=True)
    estinumb    = models.CharField(max_length=100, null=True, blank=True)
    dt_dstf     = models.CharField(max_length=100, null=True, blank=True)
    dt_stf      = models.CharField(max_length=100, null=True, blank=True)
    on_date     = models.CharField(max_length=100, null=True, blank=True)
    condstat    = models.CharField(max_length=100, null=True, blank=True)
    in_tran     = models.BooleanField(default=True)
    out_tran    = models.BooleanField(default=False)
    description = models.CharField(max_length=500, null=True, blank=True)
    out_description = models.CharField(max_length=500, null=True, blank=True)
    prefix      = models.CharField(max_length=100, null=True, blank=True)
    s_code      = models.CharField(max_length=100, null=True, blank=True)
    in_apr      = models.CharField(max_length=100, null=True, blank=True)
    out_apr     = models.CharField(max_length=100, null=True, blank=True)
    dms         = models.CharField(max_length=100, null=True, blank=True)
    no          = models.CharField(max_length=100, null=True, blank=True)
    driver      = models.CharField(max_length=100, null=True, blank=True)
    nic         = models.CharField(max_length=100, null=True, blank=True)
    rel         = models.CharField(max_length=100, null=True, blank=True)
    res         = models.CharField(max_length=100, null=True, blank=True)
    rsv         = models.CharField(max_length=100, null=True, blank=True)
    vent        = models.CharField(max_length=100, null=True, blank=True)
    ton         = models.CharField(max_length=100, null=True, blank=True)
    manuf       = models.CharField(max_length=100, null=True, blank=True)
    inp         = models.CharField(max_length=100, null=True, blank=True)
    outp        = models.CharField(max_length=100, null=True, blank=True)
    codespc     = models.CharField(max_length=100, null=True, blank=True)
    datespc     = models.CharField(max_length=100, null=True, blank=True)
    


    def __str__(self):
        return self.container_id



class Vessels(models.Model):
    vessel = models.CharField(max_length=100, null=False, blank=False)
    name = models.CharField(max_length=100, null=False, blank=False)

    def __str__(self):
        return self.vessel

class Customers(models.Model):
    customer = models.CharField(max_length=100, null=False, blank=False)
    name = models.CharField(max_length=100, null=False, blank=False)
    addLine1 = models.CharField(max_length=100, null=True, blank=True)
    addLine2 = models.CharField(max_length=100, null=True, blank=True)
    addLine3 = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.customer