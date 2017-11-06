# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
from Ejapp import settings
from django.template import loader
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from main.models import (Young, Found)


def loginUser(request):
    if settings.DEBUG == True:
       print "POST: ", request
    if request.method=='POST':
        email= request.POST.get('login_email',None)
        password= request.POST.get('login_password',None)
        if email and password:
            if settings.DEBUG == True:
                print "Request raro: ", request
                print "data: ", email+"--"+password
            try:
                user= authenticate(username=email, email=email, password=password)
                young = Young.objects.get(user=user)
                if young:
                    found = Found.objects.get(young=young)
                    if found:
                        login(request, user)
                        return JsonResponse({'result': 'ok','message': 'Hizo login exitosamente'})                        
                    else:
                        return JsonResponse({'result': 'error','message': 'Quizás no te has registrado como encontrado.'})
                else:
                    return JsonResponse({'result': 'error','message': 'No existe nadie registrado con este correo'})
            except Young.DoesNotExist:
                return JsonResponse({'result': 'error','message': 'No existe nadie registrado con este correo'})
            except Found.DoesNotExist:
                return JsonResponse({'result': 'error','message': 'Quizás no te has registrado como encontrado.'})
            
        else:
            if settings.DEBUG == True:
                print "Request: ", request
            return JsonResponse({'result': 'error','message': 'Hubo un error al intentar hacer login'})
    else:
        #template= loader.get_template('login.html')
        #return HttpResponse(template.render(context, request))
        return render(request,'login.html')

