from django.conf.urls import url 
from servstatic import views 
from django.urls import include, path

urlpatterns = [ 
    url(r'^api/servstatic$', views.service_list),
    url(r'^api/servstatic/(?P<pk>[0-9]+)$', views.service_detail),
    path('api/servstaticName/<slug:service_name>', views.service_detailByName)
   
    
]
