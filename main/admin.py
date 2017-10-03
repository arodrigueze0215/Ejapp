# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import (FdsEvents, Young, Parents)


@admin.register(FdsEvents)
class FdsEventsAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'number_fds', 'date_start', 'date_end' , 'city_fds', 'is_active')
@admin.register(Young)
class FdsYoungsAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'address', 'gender')
@admin.register(Parents)
class FdsParentAdmin(admin.ModelAdmin):
    list_display = ('id', 'young', 'name_parent', 'relationship')
