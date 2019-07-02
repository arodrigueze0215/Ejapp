# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
from Ejapp import settings
from django.template import loader
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User, Permission
from django.contrib.auth import authenticate, login
from main.models import (Young, Found)


def loginView(request):
    if settings.DEBUG == True:
       print("POST: ", request)
    if request.method=='POST':
        email= request.POST.get('login_email',None)
        password= request.POST.get('login_password',None)
        json = JsonResponse(loginUser(request, email=email, password=password))
        print(json)
        return json
    else:
        return render(request,'login.html')


def loginUser(request, **params):
    try:
        email = params.get("email")
        password = params.get("password")
        if email and password:
            user= authenticate(username=email, email=email, password=password)
            young = Young.objects.get(user=user)
            if young:
                found = Found.objects.get(young=young)
                if found:
                    login(request, user)
                    isAdviser = False
                    permissionList = Permission.objects.filter(user=user)
                    for permission in permissionList:
                        if permission.codename == "is_adviser":
                            isAdviser = True
                    return {'code':200 ,'result': 'ok','statusText': 'Hizo login exitosamente', 'is_adviser': isAdviser}
                else:
                    return {'code':404 ,'result': 'error','statusText': 'Quizás no te has registrado como encontrado.'}
            else:
                return {'code':404 ,'result': 'error','statusText': 'No existe nadie registrado con este correo.'}
        else:
            return {'code':404 ,'result': 'error','statusText': 'Hubo un error al intentar hacer login.'}
    except Young.DoesNotExist:
        return {'code':404 ,'result': 'error','statusText': 'No existe nadie registrado con este correo.'}
    except Found.DoesNotExist:
        return {'code':404 ,'result': 'error','statusText': 'Quizás no te has registrado como encontrado.'}
