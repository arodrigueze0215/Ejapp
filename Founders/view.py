# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth.models import Group
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
    password = params.get("password", None)

    try:
        if idyoung:
            young = Young.objects.get(id=idyoung)
            if young:
                if Found.objects.filter(young=young).exists():
                    data = {'bodyObject':{}, 'result': 'error','statusText': 'Ya existe alguien registrado como encontrado con estos datos. ¿Para que quieres registrarte otra vez?','code':status.HTTP_200_OK }
                    return data
                else:
                    user = young.user
                    if password:
                        user.set_password(password)
                    if active_city:
                        mGroup = Group.objects.get(name=active_city)
                        mGroup.user_set.add(user)
                    user.save()

                    found = Found()
                    found.young = young
                    if int(state) >=1 and int(state) <=2:
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
                    foundSerializer = FoundSerializer(found, context= {'request': request})
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

def NewFoundEmpty(request, **params):
    """
    Si eres un poco mas antiguo, y nunca llenaste el formulario. Necesitas ingresar toda la informacion.
    """
    """
    young
    """
    personal_gender = request.POST.get('personal_gender', None)
    personal_names = request.POST.get('personal_names', None)
    personal_lastnames = request.POST.get('personal_lastnames', None)
    personal_dateborn = request.POST.get('personal_dateborn', None)
    personal_homephone = request.POST.get('personal_homephone', None)
    personal_mobilephone = request.POST.get('personal_mobilephone', None)
    personal_address = request.POST.get('personal_address', None)
    personal_email = request.POST.get('personal_email', None)
    personal_occupation = request.POST.get('personal_occupation', None)
    personal_profession = request.POST.get('personal_profession', None)


    """
    found
    """
    state = params.get("state", None)
    number_fds = params.get("number_fds", None)
    city_fds = params.get("city_fds", None)
    active_city = params.get("active_city", None)
    area = params.get("area", None)
    name_parent_fds = params.get("name_parent_fds", None)
    password = params.get("password", None)

    if personal_names and personal_lastnames and personal_email and personal_dateborn and password:
        if User.objects.filter(username=personal_email).exists():
            msj = 'Hola %s ya existes como usuario dentro del sistema tu registro esta con el correo: %s' %(personal_names, personal_email)
            data = {'bodyObject':{}, 'result': 'error','statusText': msj,'code':status.HTTP_200_OK }
            return data
        else:
            user = User.objects.create_user(username=personal_email, email=personal_email)
            user.first_name = personal_names
            user.last_name = personal_lastnames
            user.set_password(password)
            user.save()

            young = Young()
            young.user = user
            young.date_born = personal_dateborn
            if personal_homephone:
                young.home_phone = personal_homephone
            if personal_mobilephone:
                young.mobile_phone = personal_mobilephone
            if personal_address:
                young.address = personal_address
            if personal_profession:
                young.profession = personal_profession
            if personal_occupation:
                young.occupation = personal_occupation
            if personal_gender:
                young.gender = personal_gender
            young.save()

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
            foundSerializer = FoundSerializer(found, context= {'request': request})
            data = {'bodyObject': foundSerializer.data, 'result': 'ok', 'status':status.HTTP_200_OK }
            return data

    else:
        data = {'bodyObject':{}, 'result': 'error','statusText': 'Lo sentimos!! algunos datos son obligatorios.','code':status.HTTP_200_OK }
        return  data 

def GetSingleFound(request, **params):
    idFound = params.get("pk", None)
    try:
        if idFound:
            found = Found.objects.get(id=idFound)
            if found:
                foundSerializer = FoundSerializer(found, context= {'request': request})
                data = {'bodyObject': foundSerializer.data, 'result': 'ok', 'status':status.HTTP_200_OK }
                return data
            else:
                data = {'bodyObject':{}, 'result': 'error','statusText': 'Lo sentimos!! No encontramos ningun dato en la busqueda.','code':status.HTTP_200_OK }
                return  data 
        else:
            data = {'bodyObject':{}, 'result': 'error','statusText': 'Lo sentimos!! Ocurrio un error validando el identificador del encontrado.','code':status.HTTP_200_OK }
            return  data 
    except Found.DoesNotExist:
        data = {'bodyObject':{}, 'result': 'error','statusText': 'Lo sentimos!! Ocurrio un error validando el identificador del encontrado.','code':status.HTTP_200_OK }
        return  data 

def GetListFound(request):
    try:
        user= User.objects.get(email=request.user)
        if user:
            young = Young.objects.get(user=user)
            if young:
                found = Found.objects.get(young=young)
                if found:
                    active_city = found.active_city
                    group = Group.objects.get(name=active_city)
                    foundList = Found.objects.filter(active_city=group)
                    if foundList:
                        foundSerializer = FoundSerializer(found, many=True, context= {'request': request})
                        data = {'bodyObject': foundSerializer.data, 'result': 'ok', 'status':status.HTTP_200_OK }
                        return data
                    else:
                        data = {'bodyObject':{}, 'result': 'error','statusText': 'Lo sentimos!! No encontramos ningun dato en la busqueda.','code':status.HTTP_200_OK }
                        return  data 
                else:
                    data = {'bodyObject':{}, 'result': 'error','statusText': 'Lo sentimos!! Ocurrio un error validando el identificador del encontrado.','code':status.HTTP_200_OK }
                    return  data 
            else:
                data = {'bodyObject':{}, 'result': 'error','statusText': 'Lo sentimos!! Ocurrio un error validando el identificador del encontrado.','code':status.HTTP_200_OK }
                return  data 
        else:
            data = {'bodyObject':{}, 'result': 'error','statusText': 'Lo sentimos!! Ocurrio un error validando el identificador del encontrado.','code':status.HTTP_200_OK }
            return  data 
    except User.DoesNotExist:
        data = {'bodyObject':{}, 'result': 'error','statusText': 'Lo sentimos!! Ocurrio un error validando el identificador del encontrado.','code':status.HTTP_200_OK }
        return  data 
    except Young.DoesNotExist:
        data = {'bodyObject':{}, 'result': 'error','statusText': 'Lo sentimos!! Ocurrio un error validando el identificador del encontrado.','code':status.HTTP_200_OK }
        return  data 
    except Found.DoesNotExist:
        data = {'bodyObject':{}, 'result': 'error','statusText': 'Lo sentimos!! Ocurrio un error validando el identificador del encontrado.','code':status.HTTP_200_OK }
        return  data 
    except Group.DoesNotExist:
        data = {'bodyObject':{}, 'result': 'error','statusText': 'Lo sentimos!! Ocurrio un error validando el identificador del encontrado.','code':status.HTTP_200_OK }
        return  data 