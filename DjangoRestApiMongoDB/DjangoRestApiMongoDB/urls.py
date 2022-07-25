from django.conf.urls import url, include 
 
urlpatterns = [ 
    url(r'^', include('tutorials.urls')),
    url(r'^', include('servstatic.urls')),

]