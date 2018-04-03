# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from Ejapp import controller
from Founders import view as Fview

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
        data = Fview.getListYoung(request, first_name=fName, last_name=lName, email=email)        
        return Response(data, status.HTTP_200_OK)

class NewFoundWithYoung(APIView):

    def post(self, request, format=None):
        idyoung = request.data.get("idyoung")
        state = request.data.get("state")
        number_fds = request.data.get("number_fds")
        city_fds = request.data.get("city_fds")
        active_city = request.data.get("active_fds")
        area = request.data.get("area")
        name_parent_fds = request.data.get("name_parent_fds")
        password = request.data.get("password")
        data = Fview.newFoundWithYoung(request, 
                    idyoung=idyoung,
                    state=state, 
                    number_fds=number_fds, 
                    city_fds=city_fds, 
                    active_city=active_city, 
                    area=area, 
                    name_parent_fds=name_parent_fds, 
                    password=password)        
        return Response(data, status.HTTP_200_OK)

class Founds(APIView):

    def post(self, request, format=None):
        
        personal_profession = request.data.get("personal_profession")
        personal_occupation = request.data.get("personal_occupation")
        personal_email = request.data.get("personal_email")
        personal_address = request.data.get("personal_address")
        personal_mobilephone = request.data.get("personal_mobilephone")
        personal_homephone = request.data.get("personal_homephone")
        personal_dateborn = request.data.get("personal_dateborn")
        personal_lastnames = request.data.get("personal_lastnames")
        personal_names = request.data.get("personal_names")
        personal_gender = request.data.get("personal_gender")

        state = request.data.get("state")
        number_fds = request.data.get("number_fds")
        city_fds = request.data.get("city_fds")
        active_city = request.data.get("active_fds")
        area = request.data.get("area")
        name_parent_fds = request.data.get("name_parent_fds")
        password = request.data.get("password")
        data = Fview.NewFoundEmpty(request,
                    state=state, 
                    number_fds=number_fds, 
                    city_fds=city_fds, 
                    active_city=active_city, 
                    area=area, 
                    name_parent_fds=name_parent_fds, 
                    password=password,
                    personal_profession=personal_profession,
                    personal_occupation=personal_occupation,
                    personal_email=personal_email,
                    personal_address=personal_address,
                    personal_mobilephone=personal_mobilephone,
                    personal_homephone=personal_homephone,
                    personal_dateborn=personal_dateborn,
                    personal_lastnames=personal_lastnames,
                    personal_names=personal_names,
                    personal_gender=personal_gender
                )
        return Response(data, status.HTTP_200_OK)
    
    def get(self, request, format=None):
        idfound = request.query_params.get('id')
        data = Fview.GetSingleFound(request, pk=idfound)        
        return Response(data, status.HTTP_200_OK)

