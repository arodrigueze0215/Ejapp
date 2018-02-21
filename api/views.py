# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from Ejapp import controller
from Founders import controller as Fcontroller

class InscriptionsList(APIView):
    def get(self, request, format=None):
        print "API: ",request.query_params
        city = request.query_params.get('city')
        fds = request.query_params.get('fds')
        data = controller.GetInscriptions(request, city=city,fds=fds)      
        return Response(data, status.HTTP_200_OK)
class UserAuth(APIView):
    def get(self, request, format=None):
        data = controller.AuthUserApi(request)      
        return Response(data, status.HTTP_200_OK)

class InscriptionDetails(APIView):
    def get(self, request, format=None):
        pk = request.query_params.get('id')
        data = controller.GetInscription(request, pk=pk)        
        return Response(data, status.HTTP_200_OK)
    
class ParentsList(APIView):
    def get(self, request, format=None):
        idyoung = request.query_params.get('idyoung')
        data = controller.GetParents(request, pk=idyoung)        
        return Response(data, status.HTTP_200_OK)
class BrothersList(APIView):
    def get(self, request, format=None):
        idyoung = request.query_params.get('idyoung')
        data = controller.GetBrothers(request, pk=idyoung)        
        return Response(data, status.HTTP_200_OK)
class YoungList(APIView):

    def post(self, request, format=None):
        fName = request.data.get("first_name")
        lName = request.data.get("last_name")
        email = request.data.get("email")
        data = Fcontroller.getListYoung(request, first_name=fName, last_name=lName, email=email)        
        return Response(data, status.HTTP_200_OK)

