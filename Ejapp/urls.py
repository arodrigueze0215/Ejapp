"""Ejapp URL Configuration
"""
from django.conf.urls import url, include
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^', include(('main.urls', 'main'), namespace='main')),
    url(r'^api/', include(('api.urls', 'api'), namespace='api')),
]
