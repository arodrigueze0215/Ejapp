# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework import status
from django.contrib.auth.models import User
from main.models import (Young, Found, Areas)
from api.serializers import YoungSerializer, FoundSerializer

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

def newFoundWithYoung(request, **params):
    """
    Cuando viviste FDS llenaste el formulario con el nuevo sistema (No formulario de Google Forms) (No formulario fisico)
    Puedes auto-completar la información ingresanto tus nombres, apellidos o simplemente el correo que registraste.

    Si eres un poco mas antiguo, y nunca llenaste el formulario. Necesitas ingresar toda la informacion.
    """
    idyoung = params.get("idyoung", None)
    state = params.get("state", None)
    number_fds = params.get("number_fds", None)
    city_fds = params.get("city_fds", None)
    active_city = params.get("active_city", None)
    area = params.get("area", None)
    name_parent_fds = params.get("name_parent_fds", None)

    try:
        if idyoung:
            young = Young.objects.get(id=idyoung)
            if young:
                if Found.objects.filter(young=young).exists():
                    data = {'bodyObject':{}, 'result': 'error','statusText': 'Ya existe alguien registrado como encontrado con estos datos. ¿Para que quieres registrarte otra vez?','code':status.HTTP_200_OK }
                    return data
                else:
                    found = Found()
                    found.young = young
                    if state:
                        found.state = state
                    else:
                        found.state = "1"

                    if number_fds:
                        found.number_fds = number_fds
                    else:
                        found.number_fds = "0"

                    ar = None
                    if area:
                        ar = Areas.objects.get(id=area)
                    else:
                        ar = Areas.objects.get(id="1")
                    if ar:
                        found.area = ar

                    if city_fds:
                        found.city_fds = city_fds
                    else:
                        found.city_fds = "NN"

                    if active_city:
                        found.active_city = active_city

                    if name_parent_fds:
                        found.name_parent_fds = name_parent_fds
                    found.save()
                    """Todo salio bien"""
                    foundSerializer = FoundSerializer(found, many=True, context= {'request': request})
                    data = {'bodyObject': foundSerializer.data, 'result': 'ok', 'status':status.HTTP_200_OK }
                    return data

            else:
                """young no found, maybe the id is broken"""
                data = {'bodyObject':{}, 'result': 'error','statusText': 'Los datos que seleccionaste, no parecen estar dentro de nuestros registros.','code':status.HTTP_200_OK }
                return  data 

        else:
            """Id that is comming from params is None"""    
            data = {'bodyObject':{}, 'result': 'error','statusText': 'Los datos que seleccionaste, no parecen estar dentro de nuestros registros.','code':status.HTTP_200_OK }
            return  data 

    except Young.DoesNotExist:
        data = {'bodyObject':{}, 'result': 'error','statusText': 'Los datos que seleccionaste, no parecen estar dentro de nuestros registros.','code':status.HTTP_200_OK }
        return  data 


