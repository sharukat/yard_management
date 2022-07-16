from django.shortcuts import render, redirect
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Containers
from .forms import ContainerInForm
from .serializers import ContainerInSerializer, CustomersSerializer, VesselSerializer
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
