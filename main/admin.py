# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import (FdsEvents, Young, Parents, Found, Areas, EjCities)


@admin.register(FdsEvents)
class FdsEventsAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'number_fds', 'date_start', 'date_end' , 'city_fds', 'is_active')
@admin.register(Young)
class FdsYoungsAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'address', 'gender')
@admin.register(Parents)
class FdsParentAdmin(admin.ModelAdmin):
    list_display = ('id', 'young', 'name_parent', 'relationship')
@admin.register(Found)
class FoundAdmin(admin.ModelAdmin):
    list_display = ('id', 'young', 'state', 'number_fds', 'city_fds', 'active_city', 'name_parent_fds', 'area')
@admin.register(Areas)
class AreaAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
@admin.register(EjCities)
class CitiesAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
