# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework.views import APIView
from rest_framework.response import Response
from Ejapp import controller
from rest_framework import status

class InscriptionsList(APIView):
    def get(self, request, format=None):
        city = request.data.get('city')
        inscriptionDate = request.data.get('inscription_date')
        data = controller.Inscriptions(city=city,inscription_date=inscriptionDate)        
        return Response(data, status=status.HTTP_200_OK)
    

