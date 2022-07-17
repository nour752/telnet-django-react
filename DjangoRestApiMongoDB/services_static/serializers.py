from rest_framework import serializers 
from services_static.models import Service_static
 
 
class Services_staticSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = services_static
        fields = ('id',
                  'service_name',
                  'params',
                  'chosen')