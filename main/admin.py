# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import (FdsEvents, Young, Parents, Found, Areas, EjCities, Inscription, Brothers)


@admin.register(FdsEvents)
class FdsEventsAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'number_fds', 'date_start', 'date_end' , 'city_fds', 'is_active')
@admin.register(Young)
class FdsYoungsAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'address', 'gender')
@admin.register(Parents)
class ParentAdmin(admin.ModelAdmin):
    list_display = ('id', 'young', 'name_parent', 'relationship', 'occupation', 'home_phone', 'mobile_phone', 'address', 'isalive')
@admin.register(Brothers)
class BrotherAdmin(admin.ModelAdmin):
    list_display = ('id', 'young', 'name_brother', 'date_born', 'mobile_phone', 'email', 'relationship', 'isalive')
@admin.register(Found)
class FoundAdmin(admin.ModelAdmin):
    list_display = ('id', 'young', 'state', 'number_fds', 'city_fds', 'active_city', 'name_parent_fds', 'area')
@admin.register(Areas)
class AreaAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

@admin.register(EjCities)
class CitiesAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    
@admin.register(Inscription)
class InscriptionAdmin(admin.ModelAdmin):
    list_display = ('id', 'young', 'fdsEvent', 'city', 'inscription_date', 'who_invite_me', 'pieces_save')
