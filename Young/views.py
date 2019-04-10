# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from main.models import (
    Young,
    Found
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
        fName = params.get("first_name",None)
        usersDuplicated = set()
        users = []
        usersTmp = []
        youngs = []
        if fName is None:
            users = []
        else:
            nameSplited = fName.split(" ")
            if len(nameSplited) >= 1:
                for splited in nameSplited:
                    userFiltered = User.objects.filter(first_name__contains=splited.lower())
                    usersTmp.extend(userFiltered)
                for splited in nameSplited:
                    userFiltered = User.objects.filter(last_name__contains=splited.lower())
                    usersTmp.extend(userFiltered)
                for splited in nameSplited:
                    userFiltered = User.objects.filter(email__contains=splited.lower())
                    usersTmp.extend(userFiltered)
                for splited in nameSplited:
                    userFiltered = User.objects.filter(username__contains=splited.lower())
                    usersTmp.extend(userFiltered)

                for uTemp in usersTmp:
                    if uTemp not in usersDuplicated:
                        users.append(uTemp)
                        usersDuplicated.add(uTemp)
        if len(users) == 0:
            data = {'bodyObject':{}, 'result': 'error','statusText': 'No se encontro ningun dato','status':status.HTTP_200_OK }
            return  data
        else:
            for u in users:
                found = None
                try:
                    """We need to check if a young is not a Found yet"""
                    young = Young.objects.get(user=u)
                    found = Found.objects.get(young=young)
                except Found.DoesNotExist:
                    if young is not None:
                        youngs.append(young)
                except Young.DoesNotExist:
                    pass

        if len(youngs) == 0:
            data = {'bodyObject':{}, 'result': 'error','statusText': 'No se encontro ningun dato','status':status.HTTP_200_OK }
            return  data
        else:
            youngSerializer = YoungSerializer(youngs, many=True)
            data = {'bodyObject': youngSerializer.data, 'result': 'ok', 'status':status.HTTP_200_OK }
            return data
