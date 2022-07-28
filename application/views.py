from django.shortcuts import render, redirect
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Containers
from .forms import ContainerInForm
from .serializers import ContainerInSerializer, CustomersSerializer, VesselSerializer, ContainerCheckSerializer, ContainerOutSerializer,ContainerReserveSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from knox.auth import TokenAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from django.http import JsonResponse
from datetime import datetime

# Postgresql database connection related library and cursor establishment
from django.db import connection
cursor = connection.cursor()

# Create your views here.

@api_view(['POST',])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def containerIn(request):
    if request.method == 'POST':
        serializer = ContainerInSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors)


@api_view(['POST',])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def containerOut(request):
    serializer = ContainerOutSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    container_id = serializer.validated_data['container_id']
    serial_no= serializer.validated_data['serial_no']
    rel_order = serializer.validated_data['rel_order']
    vehicle_out = serializer.validated_data['vehicle_out']
    shipper = serializer.validated_data['shipper']
    status_out = serializer.validated_data['status_out']
    condition_out = serializer.validated_data['condition_out']
    to_vessel = serializer.validated_data['to_vessel']
    p_location = serializer.validated_data['p_location']
    c_location = serializer.validated_data['c_location']
    reference = serializer.validated_data['reference']
    driver = serializer.validated_data['driver']
    nic = serializer.validated_data['nic']

    now=datetime.now()
    time_out = now.strftime("%H:%M:%S")
    date_out = now.strftime("%Y-%m-%d")
    

    # print(container_id, serial_no, rel_order, vehicle_out, shipper, status_out, condition_out, to_vessel, p_location, c_location, reference, driver, nic)

    cursor.execute("""UPDATE application_containers SET rel_order = %s, vehicle_out = %s, shipper = %s, status_out = %s, condition_out = %s, to_vessel = %s, p_location = %s, c_location = %s, reference = %s, driver = %s, nic = %s, date_out = %s, time_out = %s,out_tran=True WHERE container_id = %s AND serial_no = %s""", (rel_order, vehicle_out, shipper, status_out, condition_out, to_vessel, p_location, c_location, reference, driver, nic, date_out, time_out,container_id, serial_no))

    return Response("Success")


@api_view(['GET',])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def filterVessel(request):
        
    if request.method == 'GET':
        serializer = VesselSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        vessel = request.query_params['vessel']

        if vessel != '':
            vessel = ''.join(["%", vessel, "%"])
            cursor.execute("SELECT * FROM application_vessels WHERE name LIKE %s", [vessel])
            vessel_names = cursor.fetchall()

            response = []
            for i in range(0,len(vessel_names)):
                response.append({'id':vessel_names[i][0],'vessel':vessel_names[i][1], 'name':vessel_names[i][2]})
            return Response(response)
    else:
        return Response(serializer.errors)

@api_view(['GET',])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getVessel(request):
        
    if request.method == 'GET':
        serializer = VesselSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        vessel = request.query_params['vessel']

        if vessel != '':
            cursor.execute("SELECT name FROM application_vessels WHERE vessel = %s", [vessel])
            vessel_name = cursor.fetchone()
            return Response(vessel_name[0])
    else:
        return Response(serializer.errors)


@api_view(['GET',])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def filterCustomers (request):
    serializer = CustomersSerializer(data=request.query_params)
    serializer.is_valid(raise_exception=True)
    customer = request.query_params['customer']
    customer = ''.join(["%", customer, "%"])
    cursor.execute("SELECT id, customer, name FROM application_customers WHERE name LIKE %s", [customer])
    customer_names = cursor.fetchall()
    response = []
    for i in range(0,len(customer_names)):
        response.append({'id':customer_names[i][0],'customer':customer_names[i][1], 'name':customer_names[i][2]})
    return Response(response)



@api_view(['GET',])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getCustomer(request):
        
    if request.method == 'GET':
        serializer = CustomersSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        customer_name = request.query_params['customer']

        if customer_name != '':
            cursor.execute("SELECT name FROM application_customers WHERE customer = %s", [customer_name])
            customer_name = cursor.fetchone()
            return Response(customer_name[0])
    else:
        return Response(serializer.errors)



@api_view(['GET',])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def checkContainer(request):

    serializer = ContainerCheckSerializer(data=request.query_params)
    serializer.is_valid(raise_exception=True)
    container_id = request.query_params['container_id']
    serial_no = request.query_params['serial_no']

    if (Containers.objects.filter(container_id=container_id, serial_no=serial_no).exists()):
        cursor.execute("SELECT out_tran FROM application_containers WHERE container_id = %s AND serial_no = %s", [container_id, serial_no])
        out_tran = cursor.fetchone()
        if (out_tran[0] == False):

            cursor.execute("SELECT container_id,serial_no,customer,date_in,ex_vessel,arr_date,type,size,condition,consignee,out_tran FROM application_containers WHERE container_id = %s AND serial_no = %s", [container_id, serial_no])

            
            container_check = cursor.fetchall()
            response = []
            for i in range(0,len(container_check)):
                response.append({
                    'container_id':container_check[i][0],
                    'serial_no':container_check[i][1],
                    'customer':container_check[i][2],
                    'date_in':container_check[i][3],
                    'ex_vessel':container_check[i][4],
                    'arr_date':container_check[i][5],
                    'type':container_check[i][6],
                    'size':container_check[i][7],
                    'condition':container_check[i][8],
                    'consignee':container_check[i][9],
                    'out_tran':container_check[i][10]})

            if container_check:
                print(type(container_check))
                return Response(response)
            else:
                return Response(False)
        else:
            cursor.execute("SELECT container_id,serial_no,customer,date_in,ex_vessel,p_location,c_location,arr_date,type,size,condition,consignee, rel_order,shipper,vehicle_out,to_vessel,status_out,condition_out,reference,driver,nic,date_out,time_out,out_tran FROM application_containers WHERE container_id = %s AND serial_no = %s", [container_id, serial_no])


            container_check = cursor.fetchall()
            response = []
            for i in range(0,len(container_check)):
                response.append({
                    'container_id':container_check[i][0],
                    'serial_no':container_check[i][1],
                    'customer':container_check[i][2],
                    'date_in':container_check[i][3],
                    'ex_vessel':container_check[i][4],
                    'p_location':container_check[i][5],
                    'c_location':container_check[i][6],
                    'arr_date':container_check[i][7],
                    'type':container_check[i][8],
                    'size':container_check[i][9],
                    'condition':container_check[i][10],
                    'consignee':container_check[i][11],
                    'rel_order':container_check[i][12],
                    'shipper':container_check[i][13],
                    'vehicle_out':container_check[i][14],
                    'to_vessel':container_check[i][15],
                    'status_out':container_check[i][16],
                    'condition_out':container_check[i][17],
                    'reference':container_check[i][18],
                    'driver':container_check[i][19],
                    'nic':container_check[i][20],
                    'date_out':container_check[i][21],
                    'time_out':container_check[i][22],
                    'out_tran':container_check[i][23]})

            return Response(response)
    else:
        return Response("Container does not exist")



@api_view(['GET',])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def checkReservation(request):

    serializer = ContainerCheckSerializer(data=request.query_params)
    serializer.is_valid(raise_exception=True)
    container_id = request.query_params['container_id']
    serial_no = request.query_params['serial_no']

    if (Containers.objects.filter(container_id=container_id, serial_no=serial_no).exists()):
        cursor.execute("SELECT out_tran, rsv FROM application_containers WHERE container_id = %s AND serial_no = %s", [container_id, serial_no])
        condition = cursor.fetchone()
        out_tran = condition[0]
        rsv = condition[1]

        print(condition)
        if (out_tran == False and rsv == False):

            cursor.execute("SELECT container_id,serial_no,customer,date_in,ex_vessel,type,size,condition,consignee,out_tran,rsv FROM application_containers WHERE container_id = %s AND serial_no = %s", [container_id, serial_no])

            
            container_check = cursor.fetchall()
            response = []
            for i in range(0,len(container_check)):
                response.append({
                    'container_id':container_check[i][0],
                    'serial_no':container_check[i][1],
                    'customer':container_check[i][2],
                    'date_in':container_check[i][3],
                    'ex_vessel':container_check[i][4],
                    'type':container_check[i][5],
                    'size':container_check[i][6],
                    'condition':container_check[i][7],
                    'consignee':container_check[i][8],
                    'out_tran':container_check[i][9],
                    'rsv':container_check[i][10],})

            if container_check:
                return Response(response)
            else:
                return Response(False)

        elif (out_tran == False and rsv == True):
            cursor.execute("SELECT container_id,serial_no,customer,date_in,ex_vessel,type,size,condition,consignee,out_tran, reserved_to, reservation_date, reserved_on,rsv FROM application_containers WHERE container_id = %s AND serial_no = %s", [container_id, serial_no])

            container_check = cursor.fetchall()
            response = []
            for i in range(0,len(container_check)):
                response.append({
                    'container_id':container_check[i][0],
                    'serial_no':container_check[i][1],
                    'customer':container_check[i][2],
                    'date_in':container_check[i][3],
                    'ex_vessel':container_check[i][4],
                    'type':container_check[i][5],
                    'size':container_check[i][6],
                    'condition':container_check[i][7],
                    'consignee':container_check[i][8],
                    'out_tran':container_check[i][9],
                    'reserved_to':container_check[i][10],
                    'reservation_date':container_check[i][11],
                    'reserved_on':container_check[i][12],
                    'rsv':container_check[i][13]})

            if container_check:
                return Response(response)
            else:
                return Response(False)

        else:
            return Response("Container is already out")
    else:
        return Response("Container does not exist")



@api_view(['POST',])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def containerReserve(request):
    serializer = ContainerReserveSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    container_id = serializer.validated_data['container_id']
    serial_no= serializer.validated_data['serial_no']
    reserved_to = serializer.validated_data['reserved_to']
    reservation_date = serializer.validated_data['reservation_date']

    now=datetime.now()
    reserved_on = now.strftime("%Y-%m-%d")

    cursor.execute("""UPDATE application_containers SET reserved_to = %s, reservation_date = %s, reserved_on = %s, rsv = True WHERE container_id = %s AND serial_no = %s""", (reserved_to, reservation_date, reserved_on, container_id, serial_no))

    return Response("Success")


@api_view(['GET',])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def checkStatus(request):

    serializer = ContainerCheckSerializer(data=request.query_params)
    serializer.is_valid(raise_exception=True)
    container_id = request.query_params['container_id']
    serial_no = request.query_params['serial_no']

    if (Containers.objects.filter(container_id=container_id, serial_no=serial_no).exists()):
        cursor.execute("SELECT out_tran FROM application_containers WHERE container_id = %s AND serial_no = %s", [container_id, serial_no])
        out_tran = cursor.fetchone()
        if (out_tran[0] == False):

            cursor.execute("SELECT container_id,serial_no,customer,date_in,time_in,ex_vessel,status,type,size,condition,consignee,vehicle_in,out_tran FROM application_containers WHERE container_id = %s AND serial_no = %s", [container_id, serial_no])

            
            container_check = cursor.fetchall()
            response = []
            for i in range(0,len(container_check)):
                response.append({
                    'container_id':container_check[i][0],
                    'serial_no':container_check[i][1],
                    'customer':container_check[i][2],
                    'date_in':container_check[i][3],
                    'time_in':container_check[i][4].strftime("%I:%M %p"),
                    'ex_vessel':container_check[i][5],
                    'status':container_check[i][6],
                    'type':container_check[i][7],
                    'size':container_check[i][8],
                    'condition':container_check[i][9],
                    'consignee':container_check[i][10],
                    'vehicle_in':container_check[i][11],
                    'out_tran':container_check[i][12],
                    
                    })

            if container_check:
                return Response(response)
            else:
                return Response(False)
        else:
            cursor.execute("SELECT container_id,serial_no,customer,date_in,time_in,ex_vessel,status,type,size,condition,consignee, vehicle_in,shipper,vehicle_out,to_vessel,status_out,condition_out,reference,date_out,time_out,out_tran FROM application_containers WHERE container_id = %s AND serial_no = %s", [container_id, serial_no])


            container_check = cursor.fetchall()
            response = []
            for i in range(0,len(container_check)):
                response.append({
                    'container_id':container_check[i][0],
                    'serial_no':container_check[i][1],
                    'customer':container_check[i][2],
                    'date_in':container_check[i][3],
                    'time_in':container_check[i][4].strftime("%I:%M %p"),
                    'ex_vessel':container_check[i][5],
                    'status':container_check[i][6],
                    'type':container_check[i][7],
                    'size':container_check[i][8],
                    'condition':container_check[i][9],
                    'consignee':container_check[i][10],
                    'vehicle_in':container_check[i][11],
                    'shipper':container_check[i][12],
                    'vehicle_out':container_check[i][13],
                    'to_vessel':container_check[i][14],
                    'status_out':container_check[i][15],
                    'condition_out':container_check[i][16],
                    'reference':container_check[i][17],
                    'date_out':container_check[i][18],
                    'time_out':container_check[i][19].strftime("%I:%M %p"),
                    'out_tran':container_check[i][20]})

            return Response(response)
    else:
        return Response("Container does not exist")