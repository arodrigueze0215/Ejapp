# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from main.models import EjCities
from Ejapp.controller import AuthUserApi
from api.serializers import CitySerializer
from rest_framework import status

# Create your views here.
def listCities(request):
    try:
        auth = AuthUserApi(request)
        if auth['result'] == 'ok' and auth['status']==status.HTTP_200_OK:
            cities = EjCities.objects.all()
            if len(cities) > 0:
                citySerializer = CitySerializer(cities, many=True, context= {'request': request})
                data = {'bodyObject': citySerializer.data, 'result': 'ok', 'status':status.HTTP_200_OK }
                return data
            else:
                data = {'bodyObject':[], 'result': 'error','statusText': 'No existen Ciudades registradas','status':status.HTTP_200_OK }
                return  data 
        else:
            return auth
    except EjCities.DoesNotExist:
        data = {'bodyObject':[], 'result': 'error','statusText': 'Lo sentimos!! Ocurrio un error intentando mostrar las ciudades.','status':status.HTTP_200_OK }
        return  data 

