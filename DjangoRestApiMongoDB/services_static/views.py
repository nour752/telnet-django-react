from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from services_static.models import Service_static
from services_static.serializers import Services_staticSerializer
from rest_framework.decorators import api_view


@api_view(['GET', 'POST', 'DELETE'])
def service_static_list(request):
    if request.method == 'GET':
        services_static = Service_static.objects.all()
        
        service_name = request.GET.get('service_name', None)
        if service_name is not None:
            services_static = services_static.filter(service_name__icontains=service_name)
        
        services_static_serializer = Service_staticSerializer(services_static, many=True)
        return JsonResponse(services_static_serializer.data, safe=False)
        # 'safe=False' for objects serialization
 
    elif request.method == 'POST':
        service_static_data = JSONParser().parse(request)
        service_static_serializer = Service_staticSerializer(data=service_static_data)
        if service_static_serializer.is_valid():
            service_static_serializer.save()
            return JsonResponse(service_static_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(service_static_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        count = Services_static.objects.all().delete()
        return JsonResponse({'message': '{} Services_static were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)
 
 
@api_view(['GET', 'PUT', 'DELETE'])
def service_static_detail(request, pk):
    try: 
        service_static = Service_static.objects.get(pk=pk) 
    except Service_static.DoesNotExist: 
        return JsonResponse({'message': 'The service_static does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        service_static_serializer = Service_staticSerializer(service_static) 
        return JsonResponse(service_static_serializer.data) 
 
    elif request.method == 'PUT': 
        service_static_data = JSONParser().parse(request) 
        service_static_serializer = Service_staticSerializer(service_static, data=service_static_data) 
        if service_static_serializer.is_valid(): 
            service_static_serializer.save() 
            return JsonResponse(service_static_serializer.data) 
        return JsonResponse(service_static_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
    elif request.method == 'DELETE': 
        service_static.delete() 
        return JsonResponse({'message': 'Service_static was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
    
        
@api_view(['GET'])
def service_static_list_chosen(request):
    services_static = Service_static.objects.filter(chosen=True)
        
    if request.method == 'GET': 
        services_static_serializer = Service_staticSerializer(services_static, many=True)
        return JsonResponse(services_static_serializer.data, safe=False)
    
