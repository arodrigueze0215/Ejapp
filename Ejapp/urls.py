"""Ejapp URL Configuration
"""
from django.conf.urls import url, include
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^', include('main.urls', namespace='main')),
    url(r'^api/', include('api.urls', namespace='api')),
]
