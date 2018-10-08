# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from Ejapp import controller
from Founders import view as Fview
from Areas import views as Aview
from Cities import views as Cview
from inscriptions import views as Iview
from Family import views as familyView

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
    insController = Iview.ControllerInscription()
    def get(self, request, format=None):
        pk = request.query_params.get('id')
        data = self.insController.get(request, pk=pk)        
        return Response(data, status.HTTP_200_OK)
    
    def put(self, request, format=None):
        idyoung = request.query_params.get('idyoung')
        idIns = request.query_params.get('id')
        personal_names = request.data.get("personal_names")
        personal_lastnames = request.data.get("personal_lastnames")
        personal_email = request.data.get("personal_email")
        personal_gender = request.data.get("personal_gender")
        personal_dateborn = request.data.get("personal_dateborn")
        personal_homephone = request.data.get("personal_homephone")
        personal_mobilephone = request.data.get("personal_mobilephone")
        personal_address = request.data.get("personal_address")
        personal_occupation = request.data.get("personal_occupation")
        personal_profession = request.data.get("personal_profession")
        do_you_study = request.data.get("do_you_study")
        carrer = request.data.get("carrer")
        school = request.data.get("school")
        do_you_work = request.data.get("do_you_work")
        company = request.data.get("company")
        position_job = request.data.get("position_job")
        phone_company = request.data.get("phone_company")
        life_with_gran = request.data.get("life_with_gran")
        life_with_parent = request.data.get("life_with_parent")
        life_with_only_mother = request.data.get("life_with_only_mother")
        life_with_only_father = request.data.get("life_with_only_father")
        life_with_uncles = request.data.get("life_with_uncles")
        life_with_friends = request.data.get("life_with_friends")
        life_with_cousins = request.data.get("life_with_cousins")
        life_with_brothers = request.data.get("life_with_brothers")
        life_with_alone = request.data.get("life_with_alone")
        illness = request.data.get("illness")
        especial_food = request.data.get("especial_food")
        special_medicine = request.data.get("special_medicine")
        eps = request.data.get("eps")
        who_invite_me = request.data.get("who_invite_me")
        who_invite_me_number = request.data.get("who_invite_me_number")
        do_you_want_ej = request.data.get("do_you_want_ej")
        why_fds = request.data.get("why_fds")
        other_experiences = request.data.get("other_experiences")
        experiences_which = request.data.get("experiences_which")
        pieces_save = request.data.get("pieces_save")
        person_mostimportant_name = request.data.get("person_mostimportant_name")
        person_mostimportant_number = request.data.get("person_mostimportant_number")
        data = self.insController.update(request, 
            idIns = idIns,
            idyoung = idyoung,
            personal_names = personal_names,
            personal_lastnames = personal_lastnames,
            personal_email = personal_email,
            personal_gender = personal_gender,
            personal_dateborn = personal_dateborn,
            personal_homephone = personal_homephone,
            personal_mobilephone = personal_mobilephone,
            personal_address = personal_address,
            personal_occupation = personal_occupation,
            personal_profession = personal_profession,
            do_you_study = do_you_study,
            carrer = carrer,
            school = school,
            do_you_work = do_you_work,
            company = company,
            position_job = position_job,
            phone_company = phone_company,
            life_with_gran = life_with_gran,
            life_with_parent = life_with_parent,
            life_with_only_mother = life_with_only_mother,
            life_with_only_father = life_with_only_father,
            life_with_uncles = life_with_uncles,
            life_with_friends = life_with_friends,
            life_with_cousins = life_with_cousins,
            life_with_brothers = life_with_brothers,
            life_with_alone = life_with_alone,
            illness = illness,
            especial_food = especial_food,
            special_medicine = special_medicine,
            eps = eps,
            who_invite_me = who_invite_me,
            who_invite_me_number = who_invite_me_number,
            do_you_want_ej = do_you_want_ej,
            why_fds = why_fds,
            other_experiences = other_experiences,
            experiences_which = experiences_which,
            pieces_save = pieces_save,
            person_mostimportant_name = person_mostimportant_name,
            person_mostimportant_number = person_mostimportant_number
        )        
        return Response(data, status.HTTP_200_OK)


    
class ParentsList(APIView):
    def get(self, request, format=None):
        idyoung = request.query_params.get('idyoung')
        data = familyView.ParentController().get(request, pk=idyoung)        
        return Response(data, status.HTTP_200_OK)

    def put(self, request, format=None):
        idyoung = request.query_params.get('idyoung')
        relationship_parent = request.data.get('relationship_parent')
        names_parent = request.data.get('names_parent')
        occupation_parent = request.data.get('occupation_parent')
        phone_home_parent = request.data.get('phone_home_parent')
        phone_parent = request.data.get('phone_parent')
        address_parent = request.data.get('address_parent')
        isalive_parent = request.data.get('isalive_parent')
        data = familyView.ParentController().update(request,
            pk=idyoung, 
            relationship_parent=relationship_parent,
            names_parent=names_parent,
            occupation_parent=occupation_parent,
            phone_home_parent=phone_home_parent,
            phone_parent=phone_parent,
            address_parent=address_parent,
            isalive_parent=isalive_parent            
        )
        return Response(data, status.HTTP_200_OK)
class BrothersList(APIView):
    def get(self, request, format=None):
        idyoung = request.query_params.get('idyoung')
        data = familyView.BrothersController().get(request, pk=idyoung)        
        return Response(data, status.HTTP_200_OK)

    def put(self, request, format=None):
        print "body, ", request.body
        idyoung = request.query_params.get('idyoung')
        brothers = request.data.get('brothers')
        data = familyView.BrothersController().addOrUpdate(request,
             brothers=brothers,
             idyoung=idyoung
        )
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
                    password=password
                )        
        return Response(data, status.HTTP_200_OK)

class Found(APIView):

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
        active_city = request.data.get("active_city")
        area = request.data.get("area")
        name_parent_fds = request.data.get("name_parent_fds")
        password = request.data.get("password")
        data = Fview.newFoundEmpty(request,
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
        data = Fview.getSingleFound(request, pk=idfound)
        return Response(data, status.HTTP_200_OK)
    
    def put(self, request, format=None):
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
        number_fds = request.data.get("number_fds")
        city_fds = request.data.get("city_fds")        
        name_parent_fds = request.data.get("name_parent_fds")
        personal_username = request.data.get("personal_username")
        data = Fview.updateFound(request,
                    personal_username=personal_username,
                    number_fds=number_fds, 
                    city_fds=city_fds,
                    name_parent_fds=name_parent_fds,
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
    
    def delete(self, request, format=None):
        idfound = request.data.get('id')
        data = Fview.deleteFound(request, pk=idfound)
        return Response(data, status.HTTP_200_OK)

class FoundList(APIView):
    def get(self, request, format=None):
        data = Fview.getListFound(request)
        return Response(data, status.HTTP_200_OK)
class AreasList(APIView):
    def get(self, request, format=None):
        data = Aview.listAreas(request)
        return Response(data, status.HTTP_200_OK)
class CitiesList(APIView):
    def get(self, request, format=None):
        data = Cview.listCities(request)
        return Response(data, status.HTTP_200_OK)
