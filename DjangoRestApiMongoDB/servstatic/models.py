from django.db import models

# Create your models here.

class Service(models.Model):
    service_name = models.CharField(max_length=200, blank=False, default='')
    params = models.CharField(max_length=200, blank=False, default='')


class ServiceFill(models.Model):
    id_project = models.CharField(max_length=200, blank=False, default='')
    services = models.CharField(max_length=200, blank=False, default='')

