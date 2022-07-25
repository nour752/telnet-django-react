from django.shortcuts import render

# Create your views here.
from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from servstatic.models import Service
from servstatic.serializers import ServiceSerializer
from rest_framework.decorators import api_view

from servstatic.models import ServiceFill
from servstatic.serializers import ServiceFillSerializer



@api_view(['GET' , 'POST'])
def service_list(request ):
    if request.method == 'GET':
        servstatic = Service.objects.all()
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        console.log(body)
        
        service_name = request.GET.get('service_name', None)
        if service_name is not None:
            servstatic = servstatic.filter(service_name__icontains=service_name)
        
        servstatic_serializer = ServiceSerializer(servstatic, many=True)
        return JsonResponse(servstatic_serializer.data, safe=False)
        # 'safe=False' for objects serialization

    elif request.method == 'POST':
        service_data = JSONParser().parse(request)
        service_serializer = ServiceFillSerializer(data=service_data)
        print("dfzf")
        print(service_serializer)
        if service_serializer.is_valid():
            service_serializer.save()
            return JsonResponse(service_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(service_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


 
@api_view(['GET'])
def service_detail(request, pk):
    try: 
        service = Service.objects.get(pk=pk) 
    except Service.DoesNotExist: 
        return JsonResponse({'message': 'The service does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        service_serializer = ServiceSerializer(service) 
        
        return JsonResponse(service_serializer.data) 

@api_view(['GET'])
def service_detailByName(request, service_name):
    try: 
        service = Service.objects.filter(service_name=service_name.lower()).get()
    except Service.DoesNotExist: 
        return JsonResponse({'message': 'The service does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        service_serializer = ServiceSerializer(service) 
        
        return JsonResponse(service_serializer.data) 

@api_view(['GET' , 'POST'])
def serviceFill_list(request ):
    if request.method == 'GET':
        servstatic = ServiceFill.objects.all()
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        console.log(body)
        
        service_name = request.GET.get('service_name', None)
        if service_name is not None:
            servstatic = servstatic.filter(service_name__icontains=service_name)
        
        servstatic_serializer = ServiceFillSerializer(servstatic, many=True)
        return JsonResponse(servstatic_serializer.data, safe=False)
        # 'safe=False' for objects serialization

    elif request.method == 'POST':
        service_data = JSONParser().parse(request)
        service_serializer = ServiceFillSerializer(data=service_data)
        if service_serializer.is_valid():
            service_serializer.save()
            return JsonResponse(service_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(service_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


 
