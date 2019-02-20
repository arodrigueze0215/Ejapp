# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.core.exceptions import ObjectDoesNotExist
from Ejapp.controller import AuthUserApi
from rest_framework import status
import json
from main.models import (
    Parents,
    Young,
    Brothers
)
from api.serializers import (
    YoungSerializer,
    ParentsSerializer,
    BrothersSerializer
)

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
        
    def update(self, request, **params):
        try:
            auth = AuthUserApi(request)
            if auth['result'] == 'ok' and auth['status']==status.HTTP_200_OK:
                pk = params.get("pk")
                if pk:
                    young = Young.objects.get(id=pk)
                    relationship = params.get("relationship_parent")
                    parent = Parents.objects.get(young=young, relationship=relationship)
                    if parent:
                        name_parent_to_edit = params.get("names_parent")
                        if name_parent_to_edit and name_parent_to_edit != parent.name_parent:
                            parent.name_parent = name_parent_to_edit
                        occupation_to_edit = params.get("occupation_parent")
                        if occupation_to_edit and occupation_to_edit != parent.occupation:
                            parent.occupation = occupation_to_edit
                        phone_home_to_edit = params.get("phone_home_parent")
                        if phone_home_to_edit and phone_home_to_edit != parent.home_phone:
                            parent.home_phone = phone_home_to_edit
                        phone_to_edit = params.get("phone_parent")
                        if phone_to_edit and phone_to_edit != parent.mobile_phone:
                            parent.mobile_phone = phone_to_edit
                        address_to_edit = params.get("address_parent")
                        if address_to_edit and address_to_edit != parent.address:
                            parent.address = address_to_edit
                        isalive_to_edit = params.get("isalive_parent")
                        if isalive_to_edit and isalive_to_edit == "true":
                            parent.isalive = True
                        parent.save()
                        bodyObjectSerializer = ParentsSerializer(parent, context={'request': request})
                        
                        data = {'bodyObject':bodyObjectSerializer.data, 'result': 'ok','status':status.HTTP_200_OK, 'statusText': 'Se actualizó satisfactoriamente.'}
                        return data
                    else:
                        data = {'bodyObject':{}, 'statusText': 'No se puedo editar el padre porque no se encontró ninguno', 'result': 'error', 'status':status.HTTP_204_NO_CONTENT}
                        return data
                else:
                    data = {'bodyObject':{}, 'result': 'error','statusText': 'Parámetro incorrecto', 'status':status.HTTP_400_BAD_REQUEST}
                    return data
            else:
                return auth

        except Young.DoesNotExist:
            data = {'bodyObject':{}, 'result': 'error','statusText': 'El usuario a modificar no existe', 'status':status.HTTP_400_BAD_REQUEST}
            return data
        except Parents.DoesNotExist:
            data = {'bodyObject':{}, 'result': 'error','statusText': 'No se puedo editar el padre porque no se encontró ninguno', 'status':status.HTTP_204_NO_CONTENT}
            return data

class BrothersController():
    def get(self, request, **params):
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
            
    def addOrUpdate(self, request, **params):
        """
        update a brother of the young from a list set trought params, it search each brother and then updated it.
        But if a list has a new brother, just add it as a new brother.
        params:
            brothers
            idyoung
        """
        try:
            auth = AuthUserApi(request)
            if auth['result'] == 'ok' and auth['status']==status.HTTP_200_OK:
                young = Young.objects.get(id=params.get("idyoung"))
                brothers = params.get("brothers")
                if brothers:
                    
                    newListBrothers = []
                    for bro in brothers:
                        pk = bro['id'] 
                        if pk != -1:
                            brother = Brothers.objects.get(id=pk)
                            if bro['name_brother'] and bro['name_brother'] != brother.name_brother:
                                brother.name_brother = bro['name_brother'] 
                            if bro['email'] and bro['email'] != brother.email:
                                brother.email = bro['email']
                            if bro['date_born'] and bro['date_born'] != brother.date_born:
                                brother.date_born = bro['date_born']
                            if bro['mobile_phone'] and bro['mobile_phone'] != brother.mobile_phone:
                                brother.mobile_phone = bro['mobile_phone']
                            if bro['relationship'] and bro['relationship'] != brother.relationship:
                                brother.relationship = bro['relationship']
                            if bro['isalive'] and bro['isalive'] == 'false':
                                brother.isalive = False
                            brother.save()
                        else:
                            brother = Brothers()
                            brother.young = young
                            brother.name_brother = bro['name_brother']
                            if bro['email']:
                                brother.email = bro['email']
                            if bro['date_born']:
                                brother.date_born = bro['date_born']
                            if bro['mobile_phone']:
                                brother.mobile_phone = bro['mobile_phone']
                            if bro['relationship']:
                                brother.relationship = bro['relationship']
                            brother.save()
                        newListBrothers.append(brother)
                    bodyObjectSerializer = BrothersSerializer(newListBrothers, many=True, context={'request': request})
                    data = {'bodyObject':bodyObjectSerializer.data, 'result': 'ok', 'resultText': 'Se han modificado satisfactoriamente.','status':status.HTTP_200_OK}
                    return data
                else:
                    data = {'bodyObject':{}, 'result': 'ok','statusText': 'No hay hermanos para modificar','status':status.HTTP_400_BAD_REQUEST}
                    return data
            else:
                return auth
        except Young.DoesNotExist:
            data = {'object':{}, 'result': 'error','statusText': 'No existe joven','status':status.HTTP_400_BAD_REQUEST}
            return data
        except Brothers.DoesNotExist:
            data = {'object':{}, 'result': 'error','statusText': 'No existe joven','status':status.HTTP_400_BAD_REQUEST}
            return data
            