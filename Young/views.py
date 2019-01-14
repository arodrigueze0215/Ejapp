# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from main.models import (
    Young,
 )

from api.serializers import (
    YoungSerializer
)

class YoungController():

    def update(self,**params):

        """User"""
        personal_names = params.get('personal_names', None)
        personal_lastnames = params.get('personal_lastnames', None)
        personal_email = params.get('personal_email', None)
        personal_username = params.get('personal_username', None)

        """
        young
        """
        idyoung = params.get('idyoung', None)
        personal_gender = params.get('personal_gender', None)
        personal_dateborn = params.get('personal_dateborn', None)
        personal_homephone = params.get('personal_homephone', None)
        personal_mobilephone = params.get('personal_mobilephone', None)
        personal_address = params.get('personal_address', None)
        personal_occupation = params.get('personal_occupation', None)
        personal_profession = params.get('personal_profession', None)
        try:
            if idyoung:
                young = Young.objects.get(id=idyoung)
                user = young.user
                if personal_names and personal_names != user.first_name:
                    user.first_name = personal_names
                if personal_lastnames  and personal_lastnames != user.last_name:
                    user.last_name = personal_lastnames
                if personal_email and personal_email != user.email:
                    if User.objects.filter(email=personal_email).exists():
                        data = {'bodyObject':{}, 'result': 'error','statusText': 'No se pudo actualizar porque ya existe un usuario con este correo','status':status.HTTP_200_OK }
                        return data
                    else:
                        user.email = personal_email
                if personal_username and personal_username != user.username:
                    if User.objects.filter(username=personal_username).exists():
                        data = {'bodyObject':{}, 'result': 'error','statusText': 'Ya existe un usuario con este username','status':status.HTTP_200_OK }
                        return data
                    else:
                        user.username = personal_username
                user.save()
                young.user = user
                if personal_gender and personal_gender != young.gender:
                    young.gender = personal_gender
                if personal_dateborn and personal_dateborn != young.date_born:
                    young.date_born = personal_dateborn
                if personal_homephone and personal_homephone != young.home_phone:
                    young.home_phone = personal_homephone
                if personal_mobilephone and personal_mobilephone != young.mobile_phone:
                    young.mobile_phone = personal_mobilephone
                if personal_address and personal_address != young.address:
                    young.address = personal_address
                if personal_occupation and personal_occupation != young.occupation:
                    young.occupation = personal_occupation
                if personal_profession and personal_profession != young.profession:
                    young.profession = personal_profession
                young.save()
                youngSerializer = YoungSerializer(young)
                data = {'bodyObject': youngSerializer.data, 'statusText': 'Se ha actualizado exitosamente.', 'result': 'ok', 'status':status.HTTP_200_OK }
                return data
            else:
                data = {'bodyObject':{}, 'result': 'error','statusText': 'El joven a modificar no existe', 'status':status.HTTP_400_BAD_REQUEST}
                return data

        except Young.DoesNotExist:
            data = {'bodyObject':{}, 'result': 'error','statusText': 'El joven a modificar no existe', 'status':status.HTTP_400_BAD_REQUEST}
            return data
    
    def listFiltered(self,**params):
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
                youngSerializer = YoungSerializer(youngs, many=True)
                data = {'bodyObject': youngSerializer.data, 'result': 'ok', 'status':status.HTTP_200_OK }
                return data
            data = {'bodyObject':{}, 'result': 'error','statusText': 'No se encontro ningun dato','status':status.HTTP_200_OK }
            return  data

        except Young.DoesNotExist:
            data = {'bodyObject':{}, 'result': 'error','statusText': 'No se encontro ningun dato','status':status.HTTP_200_OK }
            return  data
