# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework.views import APIView
from rest_framework.response import Response
from Ejapp import controller

class InscriptionsList(APIView):
    def get(self, request, format=None):
        print "API: ",request.user
        city = request.data.get('city')
        inscriptionDate = request.data.get('inscription_date')
        data = controller.GetInscriptions(request, city=city,inscription_date=inscriptionDate)      
        return Response(data, status=data['status'])

class InscriptionDetails(APIView):
    def get(self, request, pk, format=None):
        data = controller.GetInscription(request, id=pk)        
        return Response(data, status=data['status'])
    
class ParentsList(APIView):
    def get(self, request, format=None):
        idyoung = request.data.get('idyoung')
        data = controller.GetParents(request, pk=idyoung)        
        return Response(data, status=data['status'])
class BrothersList(APIView):
    def get(self, request, format=None):
        idyoung = request.data.get('idyoung')
        data = controller.GetBrothers(request, pk=idyoung)        
        return Response(data, status=data['status'])

