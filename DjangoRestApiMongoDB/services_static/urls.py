from django.conf.urls import url 
from django.conf.urls import url 
from services_static import views 
 
urlpatterns = [ 
    url(r'^api/services_static$', views.service_static_list(request)),
    url(r'^api/services_static/(?P<pk>[0-9]+)$', views.service_static_detail),
    url(r'^api/services_static/chosen$', views.service_static_list_chosen(request))
]
