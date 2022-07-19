from django.shortcuts import render, redirect
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Containers
from .forms import ContainerInForm
from .serializers import ContainerInSerializer, CustomersSerializer, VesselSerializer, ContainerCheckSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from knox.auth import TokenAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from django.http import JsonResponse

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

            cursor.execute("SELECT container_id,serial_no,customer,date_in,ex_vessel,arr_date,type,size,condition,consignee FROM application_containers WHERE container_id = %s AND serial_no = %s", [container_id, serial_no])

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
                    'consignee':container_check[i][9]})

            if container_check:
                print(type(container_check))
                return Response(response)
            else:
                return Response(False)
        else:
            cursor.execute("SELECT container_id,serial_no,customer,date_in,ex_vessel,p_location,c_location,arr_date,type,size,condition,consignee, rel_order,shipper,vehicle_out,to_vessel,status_out,condition_out,reference,driver,nic,date_out,time_out FROM application_containers WHERE container_id = %s AND serial_no = %s", [container_id, serial_no])

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
                    'time_out':container_check[i][22]})

            return Response(False)
    else:
        return Response("Container does not exist")