# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
from Ejapp import settings
from django.template import loader
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from main.models import (Young, Found)
from Ejapp import controller


def loginUser(request):
    if settings.DEBUG == True:
       print "POST: ", request
    if request.method=='POST':
        email= request.POST.get('login_email',None)
        password= request.POST.get('login_password',None)
        json = JsonResponse(controller.loginUser(request, email=email, password=password))
        print json
        return json
    else:
        #template= loader.get_template('login.html')
        #return HttpResponse(template.render(context, request))
        return render(request,'login.html')

