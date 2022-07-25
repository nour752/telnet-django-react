from rest_framework import serializers 
from servstatic.models import Service
from servstatic.models import ServiceFill
 
 
class ServiceSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Service
        fields = ('id',
                  'service_name',
                  'params')

class ServiceFillSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = ServiceFill
        fields = ('id',
                  'project_id',
                  'services')

                  