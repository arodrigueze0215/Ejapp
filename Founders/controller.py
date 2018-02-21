# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework import status
from django.contrib.auth.models import User
from main.models import (Young)
from api.serializers import YoungSerializer

"""Return the list Youngs whos registered by inscriptions form before"""
def getListYoung(request, **params):
    try:
        fName = params.get("first_name",None)
        lName = params.get("last_name", None)
        email = params.get("email", None)
        users = []
        youngs = []
        if fName is not None and lName is not None and email is not None:
            users = User.objects.filter(first_name__contains=fName, last_name__contains=lName, email__contains=email)
        elif fName is not None and lName is not None:
            users = User.objects.filter(first_name__contains=fName, last_name__contains=lName)
        elif fName is not None and email is not None:
            users = User.objects.filter(first_name__contains=fName, email__contains=email)
        elif lName is not None and email is not None:
            users = User.objects.filter(last_name__contains=lName, email__contains=email)
        elif fName is not None:
            users = User.objects.filter(first_name__contains=fName)
        elif lName is not None:
            users = User.objects.filter(last_name__contains=lName)
        elif email is not None:
            users = User.objects.filter(email__contains=email)
        else:
            users = []
        if len(users) > 0:
            for u in users:
                young = Young.objects.get(user=u)
                if young is not None:
                    youngs.append(young)
        if len(youngs)>0:
            youngSerializer = YoungSerializer(youngs, many=True, context= {'request': request})
            data = {'bodyObject': youngSerializer.data, 'result': 'ok', 'status':status.HTTP_200_OK }
            return data
        data = {'bodyObject':{}, 'result': 'error','statusText': 'No se encontro ningun dato','code':status.HTTP_200_OK }
        return  data

    except Young.DoesNotExist:
        data = {'bodyObject':{}, 'result': 'error','statusText': 'No se encontro ningun dato','code':status.HTTP_200_OK }
        return  data