
# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import authenticate, login
from rest_framework import status
from main.models import (FdsEvents, Young, Inscription, Parents, Brothers, Found)
from api.serializers import (
    YoungSerializer, InscriptionSerializer, InscriptionSerializerAll, 
    fdsEventSerializer, FoundSerializer, ParentsSerializer,
    BrothersSerializer
    )

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
                    queryset = FoundSerializer(found, many=False, context={'request': request})
                    return {'status':status.HTTP_200_OK ,'result': 'ok','authUser': queryset.data}
                else:
                    return {'status':status.HTTP_401_UNAUTHORIZED ,'result': 'error','statusText': 'Permisos restringidos.'}
            else:
                return {'status':status.HTTP_401_UNAUTHORIZED ,'result': 'error','statusText': 'Permisos restringidos.'}
        else:
            return {'status':status.HTTP_401_UNAUTHORIZED ,'result': 'error','statusText': 'Permisos restringidos.'}
    except User.DoesNotExist:
        return {'status':status.HTTP_401_UNAUTHORIZED ,'result': 'error','statusText': 'Permisos restringidos.'}
    except Young.DoesNotExist:
        return {'status':status.HTTP_401_UNAUTHORIZED ,'result': 'error','statusText': 'Permisos restringidos.'}
    except Found.DoesNotExist:
        return {'status':status.HTTP_401_UNAUTHORIZED ,'result': 'error','statusText': 'Permisos restringidos.'}

def GetInscriptions(request, **params):
    try:
        auth = AuthUserApi(request)
        if auth['result'] == 'ok' and auth['status']==status.HTTP_200_OK:
            city = params.get("city")
            fdsNum = params.get("fds")
            print "Params fds: ", fdsNum
            print "Params city: ", city
            if fdsNum and city:
                fds = FdsEvents.objects.get(number_fds=fdsNum)
                if fds:
                    queryset = Inscription.objects.filter(fdsEvent=fds, city=city)
                    if queryset:
                        headerObjectobjSerializer = fdsEventSerializer(fds, many=False, context={'request': request})
                        objSerializer = InscriptionSerializer(queryset, many=True, context={'request': request})
                        if objSerializer:
                            data = { 'object':{'headerObject':headerObjectobjSerializer.data,'bodyObject':objSerializer.data}, 'result':'ok', 'status':status.HTTP_200_OK}
                            return data
                        else:
                            data = {'object':{}, 'result': 'error','statusText': 'No serealiza corréctamente','status':status.HTTP_400_BAD_REQUEST}
                            return data
                    else:
                        data = {'object':{}, 'result': 'error','statusText': 'No existe ninguna ficha de inscripción para este Fds.','status':status.HTTP_400_BAD_REQUEST}
                        return data
                else:
                    data = {'object':{}, 'result': 'error', 'statusText': 'No existe este FDS aún','status':status.HTTP_404_NOT_FOUND}
                    return data
            elif city:
                fds = FdsEvents.objects.get(city_fds=city)
                if fds:
                    headerObjectobjSerializer = FdsEventSerializer(fds, many=False, context={'request': request})
                    queryset = Inscription.objects.filter(FdsEvent=fds)                
                    if queryset:
                        objSerializer = InscriptionSerializer(queryset, many=True, context={'request': request})
                        data = {'object':{'headerObject':headerObjectobjSerializer.data,'bodyObject':objSerializer.data}, 'result':'ok', 'status':status.HTTP_200_OK}
                        return data
                    else:
                        data = {'object':{}, 'result': 'error','status':status.HTTP_400_BAD_REQUEST}
                        return data
                else:
                    data = {'object':{}, 'result': 'error', 'statusText': 'No existe este FDS aún','status':status.HTTP_404_NOT_FOUND}
                    return data 
            elif fdsNum:
                fds = FdsEvents.objects.get(number_fds=fdsNum)
                if fds:
                    headerObjectobjSerializer = FdsEventSerializer(fds, many=False, context={'request': request})
                    queryset = Inscription.objects.filter(fdsEvent=fds)
                    objSerializer = InscriptionSerializer(queryset, many=True, context={'request': request})
                    if objSerializer:
                        data = {'object':{'headerObject':headerObjectobjSerializer.data,'bodyObject':objSerializer.data}, 'result': 'ok','status':status.HTTP_200_OK}
                        return data
                    else:
                        data = {'object':{}, 'result': 'error','statusText': 'No serealiza corréctamente','status':status.HTTP_400_BAD_REQUEST}
                        return data
                else:
                    data = {'object':{}, 'result': 'error', 'statusText': 'No existe este FDS aún','status':status.HTTP_404_NOT_FOUND}
                    return data
            else:
                data = {'object':{}, 'result': 'ok','status':status.HTTP_200_OK}
                return data
        else:
            return auth
    except Inscription.DoesNotExist:
            data = {'object':{}, 'result': 'error','statusText': 'Inscripción no existe','code':status.HTTP_400_BAD_REQUEST}
            return data
    
def GetInscription(request, **params):
    try:
        auth = AuthUserApi(request)
        if auth['result'] == 'ok' and auth['status']==status.HTTP_200_OK:
            pk = params.get("pk")
            inscription = Inscription.objects.get(id=pk)
            if inscription:
                objSerializer = InscriptionSerializerAll(inscription, many=False, context={'request': request})
                data = {'bodyObject':objSerializer.data, 'result': 'ok','status':status.HTTP_200_OK}
                return data
            else:
                data = {'bodyObject':{}, 'statusText': 'Inscripción no existe', 'result': 'error','status':status.HTTP_400_BAD_REQUEST}
                return data
        else:
            return auth        
    except Inscription.DoesNotExist:
            data = {'bodyObject':{}, 'result': 'error', 'statusText': 'Inscripción no existe', 'status':status.HTTP_400_BAD_REQUEST}
            return data
            

def GetParents(request, **params):
    try:
        auth = AuthUserApi(request)
        if auth['result'] == 'ok' and auth['status']==status.HTTP_200_OK:
            pk = params.get("pk")
            if pk:
                young = Young.objects.get(id=pk)
                parents = Parents.objects.filter(young=young)
                if len(parents)>0:
                    headerObjectobjSerializer = YoungSerializer(young, many=False, context={'request': request})
                    bodyObjectSerializer = ParentsSerializer(parents, many=True, context={'request': request})
                    
                    data = {'object':{'headerObject':headerObjectobjSerializer.data,'bodyObject':bodyObjectSerializer.data}, 'result': 'ok','status':status.HTTP_200_OK}
                    return data
                else:
                    if young:
                        headerObjectobjSerializer = YoungSerializer(young, many=False, context={'request': request})
                        data = {'object':{'headerObject':headerObjectobjSerializer.data,'bodyObject':[]}, 'result': 'ok', 'status':status.HTTP_204_NO_CONTENT}
                        return data
                    else:
                        data = {'object':{}, 'result': 'error', 'statusText': 'Joven no encontrado', 'status':status.HTTP_404_NOT_FOUND}
                        return data
            else:
                data = {'object':{}, 'result': 'error','statusText': 'Parámetro incorrecto', 'status':status.HTTP_400_BAD_REQUEST}
                return data
        else:
            return auth
    except Young.DoesNotExist:
        data = {'object':{}, 'result': 'error','statusText': 'No existe joven', 'status':status.HTTP_400_BAD_REQUEST}
        return data
    except Parents.DoesNotExist:
        data = {'object':{}, 'result': 'error','statusText': 'No existe joven', 'status':status.HTTP_400_BAD_REQUEST}
        return data

def GetBrothers(request, **params):
    try:
        auth = AuthUserApi(request)
        if auth['result'] == 'ok' and auth['status']==status.HTTP_200_OK:
            pk = params.get("pk")
            if pk:
                young = Young.objects.get(id=pk)
                brothers = Brothers.objects.filter(young=young)
                if len(brothers)>0:
                    headerObjectobjSerializer = YoungSerializer(young, many=False, context={'request': request})
                    bodyObjectSerializer = BrothersSerializer(brothers, many=True, context={'request': request})
                    data = {'object':{'headerObject':headerObjectobjSerializer.data,'bodyObject':bodyObjectSerializer.data}, 'result': 'ok','status':status.HTTP_200_OK}
                    return data
                else:
                    if young:
                        headerObjectobjSerializer = YoungSerializer(young, many=False, context={'request': request})
                        data = {'object':{'headerObject':headerObjectobjSerializer.data,'bodyObject':[]}, 'result': 'ok', 'status':status.HTTP_204_NO_CONTENT}
                        return data
                    else:
                        data = {'object':{}, 'result': 'error', 'statusText': 'Joven no encontrado', 'status':status.HTTP_404_NOT_FOUND}
                        return data
            else:
                data = {'object':{}, 'result': 'error','statusText': 'Parámetro incorrecto','status':status.HTTP_400_BAD_REQUEST}
                return data
        else:
            return auth
    except Young.DoesNotExist:
        data = {'object':{}, 'result': 'error','statusText': 'No existe joven','status':status.HTTP_400_BAD_REQUEST}
        return data
    except Brothers.DoesNotExist:
        data = {'object':{}, 'result': 'error','statusText': 'No existe joven','status':status.HTTP_400_BAD_REQUEST}
        return data