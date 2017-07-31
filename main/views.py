# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
from django.template import loader


def inscriptions_add(request):
     return render(request, 'inscrip.html')

def list_fds(request):
     return render(request, 'fds-list.html')
