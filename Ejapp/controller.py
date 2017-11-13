
# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import authenticate, login
from api.serializers import (InscriptionSerializer)
from rest_framework import status
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

def AuthUserApi(request):
    try:
        user= User.objects.get(email=request.user)
        if user:
            young = Young.objects.get(user=user)
            if young:
                found = Found.objects.get(young=young)
                if found:
                    return {'code':status.HTTP_200_OK ,'result': 'ok','message': 'Autenticado'}
                else:
                    return {'code':status.HTTP_401_UNAUTHORIZED ,'result': 'error','message': 'Permisos restringidos.'}
            else:
                return {'code':status.HTTP_401_UNAUTHORIZED ,'result': 'error','message': 'Permisos restringidos.'}
        else:
            return {'code':status.HTTP_401_UNAUTHORIZED ,'result': 'error','message': 'Permisos restringidos.'}
    except User.DoesNotExist:
        return {'code':status.HTTP_401_UNAUTHORIZED ,'result': 'error','message': 'Permisos restringidos.'}
    except Young.DoesNotExist:
        return {'code':status.HTTP_401_UNAUTHORIZED ,'result': 'error','message': 'Permisos restringidos.'}
    except Found.DoesNotExist:
        return {'code':status.HTTP_401_UNAUTHORIZED ,'result': 'error','message': 'Permisos restringidos.'}

def GetInscriptions(request, **params):
    try:
        auth = AuthUserApi(request)
        if auth['result'] == 'ok' and auth['code']==status.HTTP_200_OK:
            city = params.get("city")
            inscriptionDate = params.get("inscription_date")
            if city:
                queryset = Inscription.objects.filter(city=city)
                if queryset:
                    objSerializer = InscriptionSerializer(queryset, many=True, context={'request': request})
                    data = {'object':objSerializer.data, 'result':'ok', 'code':status.HTTP_200_OK}
                    return data
                else:
                    data = {'object':{}, 'result': 'error','code':status.HTTP_400_BAD_REQUEST}
                    return data
            elif inscriptionDate:
                queryset = Inscription.objects.filter(inscription_date=inscriptionDate)
                objSerializer = InscriptionSerializer(queryset, many=True, context={'request': request})
                if objSerializer:
                    data = {'object':objSerializer.data, 'result': 'ok','code':status.HTTP_200_OK}
                    return data
                else:
                    data = {'object':{}, 'result': 'error','code':status.HTTP_400_BAD_REQUEST}
                    return data
            elif inscriptionDate and city:
                queryset = Inscription.objects.filter(inscription_date=inscriptionDate, city=city)
                objSerializer = InscriptionSerializer(queryset, many=True, context={'request': request})
                if objSerializer:
                    data = {'object':objSerializer.data, 'result': 'ok','code':status.HTTP_200_OK}
                    return data
                else:
                    data = {'object':{}, 'result': 'error','code':status.HTTP_400_BAD_REQUEST}
                    return data
            else:
                queryset = Inscription.objects.filter()
                objSerializer = InscriptionSerializer(queryset, many=True, context={'request': request})
                if objSerializer:
                    data = {'object':objSerializer.data, 'result': 'ok','code':status.HTTP_200_OK}
                    return data
                else:
                    data = {'object':{}, 'result': 'error','code':status.HTTP_400_BAD_REQUEST}
                    return data
        else:
            return auth
    except Inscription.DoesNotExist:
            data = {'object':{}, 'result': 'error','code':status.HTTP_400_BAD_REQUEST}
            return data
    
def GetInscription(request, pk):
    try:
        auth = AuthUserApi(request)
        if auth['result'] == 'ok' and auth['code']==status.HTTP_200_OK:
            Inscription = Inscription.objects.get(id=pk)
            if Inscription:
                objSerializer = InscriptionSerializer(Inscription, many=True, context={'request': request})
                data = {'object':objSerializer.data, 'result': 'ok','code':status.HTTP_200_OK}
                return data
            else:
                data = {'object':'null', 'result': 'error','code':status.HTTP_400_BAD_REQUEST}
                return data
        else:
            return auth        
    except Inscription.DoesNotExist:
            data = {'object':'null', 'result': 'error','code':status.HTTP_400_BAD_REQUEST}
            return data
            

def GetParents(request, **params):
    try:
        auth = AuthUserApi(request)
        if auth['result'] == 'ok' and auth['code']==status.HTTP_200_OK:
            pk = params.get("pk")
            if pk:
                young = Young.objects.get(id=pk)
                parents = Parents.objects.get(young=young)
                if parents:
                    objSerializer = ParentsSerializer(parents, many=True, context={'request': request})
                    data = {'object':objSerializer, 'result': 'ok','code':status.HTTP_200_OK}
                    return data
                else:
                    data = {'object':{}, 'result': 'error','code':status.HTTP_400_BAD_REQUEST}
                    return data
            else:
                data = {'object':{}, 'result': 'error','code':status.HTTP_400_BAD_REQUEST}
                return data
        else:
            return auth
    except Young.DoesNotExist:
        data = {'object':{}, 'result': 'error','code':status.HTTP_400_BAD_REQUEST}
        return data

def GetBrothers(request, **params):
    try:
        auth = AuthUserApi(request)
        if auth['result'] == 'ok' and auth['code']==status.HTTP_200_OK:
            pk = params.get("pk")
            if pk:
                young = Young.objects.get(id=pk)
                brothers = Brothers.objects.get(young=young)
                if brothers:
                    objSerializer = BrothersSerializer(brothers, many=True, context={'request': request})
                    data = {'object':objSerializer, 'result': 'ok','code':status.HTTP_200_OK}
                    return data
                else:
                    data = {'object':{}, 'result': 'error','code':status.HTTP_400_BAD_REQUEST}
                    return data
            else:
                data = {'object':{}, 'result': 'error','code':status.HTTP_400_BAD_REQUEST}
                return data
        else:
            return auth
    except Young.DoesNotExist:
        data = {'object':{}, 'result': 'error','code':status.HTTP_400_BAD_REQUEST}
        return data