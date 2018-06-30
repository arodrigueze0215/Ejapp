# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.core.exceptions import ObjectDoesNotExist
from Ejapp.controller import AuthUserApi
from rest_framework import status
from main.models import (
    Parents,
    Young
)
from api.serializers import (
    YoungSerializer,
    ParentsSerializer
)

# Create your views here.
class ParentController():
    def get(self, request, **params):
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
