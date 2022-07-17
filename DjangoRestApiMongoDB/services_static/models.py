from django.db import models

# Create your models here.
class Service_static(models.Model):
    service_name = models.CharField(max_length=70, blank=False, default='')
    params = models.CharField(max_length=200, blank=False, default='')
    chosen = models.BooleanField(default=False)
