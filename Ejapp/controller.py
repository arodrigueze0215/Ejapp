
# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import authenticate, login
from api.serializers import (InscriptionSerializer)
from main.models import (FdsEvents, Young, Inscription, Parents, Brothers, Found)

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
                    return {'code':200 ,'result': 'ok','message': 'Hizo login exitosamente'}
                else:
                    return {'code':404 ,'result': 'error','message': 'Quizás no te has registrado como encontrado.'}
            else:
                return {'code':404 ,'result': 'error','message': 'No existe nadie registrado con este correo.'}
        else:
            return {'code':404 ,'result': 'error','message': 'Hubo un error al intentar hacer login.'}
    except Young.DoesNotExist:
        return {'code':404 ,'result': 'error','message': 'No existe nadie registrado con este correo.'}
    except Found.DoesNotExist:
        return {'code':404 ,'result': 'error','message': 'Quizás no te has registrado como encontrado.'}

def Inscriptions(**params):
    try:
        city = params.get("city")
        inscriptionDate = params.get("inscription_date")
        if city:
            queryset = Inscription.object.filter(city=city)
            objSerializer = InscriptionSerializer(queryset, many=True)
            data = {'object':objSerializer.data, 'result': 'ok','code':200}
            return data
        elif inscriptionDate:
            queryset = Inscription.object.filter(inscription_date=inscriptionDate)
            objSerializer = InscriptionSerializer(queryset, many=True)
            data = {'object':objSerializer.data, 'result': 'ok','code':200}
            return data
        elif inscriptionDate and city:
            queryset = Inscription.object.filter(inscription_date=inscriptionDate, city=city)
            objSerializer = InscriptionSerializer(queryset, many=True)
            data = {'object':objSerializer.data, 'result': 'ok','code':200}
            return data
        else:
            queryset = Inscription.object.filter()
            objSerializer = InscriptionSerializer(queryset, many=True)
            data = {'object':objSerializer.data, 'result': 'ok','code':200}
            return data
    except Inscription.DoesNotExist:
            data = {'object':'null', 'result': 'error','code':404}
            return data
        

    