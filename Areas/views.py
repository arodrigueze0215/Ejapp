# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from Ejapp.controller import AuthUserApi
from main.models import Areas
from api.serializers import AreaSerializer
from rest_framework import status

# Create your views here.
def listAreas(request):
    try:
        auth = AuthUserApi(request)
        if auth['result'] == 'ok' and auth['status']==status.HTTP_200_OK:
            areas = Areas.objects.all()
            if len(areas) > 0:
                areasSerializer = AreaSerializer(areas, many=True, context= {'request': request})
                data = {'bodyObject': areasSerializer.data, 'result': 'ok', 'status':status.HTTP_200_OK }
                return data
            else:
                data = {'bodyObject':[], 'result': 'error','statusText': 'No existen Areas registradas','status':status.HTTP_200_OK }
                return  data 
        else:
            return auth
    except Areas.DoesNotExist:
        data = {'bodyObject':[], 'result': 'error','statusText': 'Lo sentimos!! Ocurrio un error con tu sesion y no el sistema no puede mostrar la informacion.','status':status.HTTP_200_OK }
        return  data 
