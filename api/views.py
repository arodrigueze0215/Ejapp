# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework.views import APIView
from rest_framework.response import Response
from Ejapp import controller

class InscriptionsList(APIView):
    def get(self, request, format=None):
        print "API: ",request.query_params
        city = request.query_params.get('city')
        fds = request.query_params.get('fds')
        data = controller.GetInscriptions(request, city=city,fds=fds)      
        return Response(data, status=data['status'])
class UserAuth(APIView):
    def get(self, request, format=None):
        data = controller.AuthUserApi(request)      
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

