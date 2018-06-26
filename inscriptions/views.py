# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.core.exceptions import ObjectDoesNotExist
from Ejapp.controller import AuthUserApi
from rest_framework import status
from main.models import (
    Inscription,
    Young
)
from api.serializers import (
    InscriptionSerializerAll
)

class ControllerInscription():
    def get(self, request, **params):
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
    def edit(request, **params):
        pass
    
