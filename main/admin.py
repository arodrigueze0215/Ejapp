# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import FdsEvents


@admin.register(FdsEvents)
class FdsEventsAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'number_fds', 'date_start', 'date_end' , 'city_fds', 'is_active')
