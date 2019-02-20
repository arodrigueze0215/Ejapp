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
from Young.views import YoungController
from Family.views import BrothersController, ParentController

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
    def update(self, request, **params):
        """
        Update an Inscription 
        Params : idyoung, idIns
        Params User : personal_names, personal_lastnames, personal_email, personal_username
        Params Young : personal_gender, personal_dateborn, personal_homephone, personal_mobilephone, personal_address, personal_occupation, personal_profession
        """
        try:
            auth = AuthUserApi(request)
            if auth['result'] == 'ok' and auth['status']==status.HTTP_200_OK:
                idIns = params.get("idIns")
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
                inscription = Inscription.objects.get(id=idIns)
                
                
                """Inscription"""
                do_you_study = params.get("do_you_study", None)
                carrer = params.get("carrer", None)
                school = params.get("school", None)
                do_you_work = params.get("do_you_work",None)
                company = params.get("company", None)
                position_job = params.get("position_job", None)
                phone_company = params.get("phone_company", None)
                life_with_gran = params.get("life_with_gran", None)
                life_with_parent = params.get("life_with_parent", None)
                life_with_only_mother = params.get("life_with_only_mother", None)
                life_with_only_father = params.get("life_with_only_father", None)
                life_with_uncles = params.get("life_with_uncles", None)
                life_with_friends = params.get("life_with_friends", None)
                life_with_cousins = params.get("life_with_cousins", None)
                life_with_brothers = params.get("life_with_brothers", None)
                life_with_alone = params.get("life_with_alone", None)
                illness = params.get("illness", None)
                especial_food = params.get("especial_food", None)
                special_medicine = params.get("special_medicine", None)
                eps = params.get("eps", None)
                who_invite_me = params.get("who_invite_me", None)
                who_invite_me_number = params.get("who_invite_me_number", None)
                do_you_want_ej = params.get("do_you_want_ej", None)
                why_fds = params.get("why_fds", None)
                other_experiences = params.get("other_experiences", None)
                experiences_which = params.get("experiences_which", None)
                pieces_save = params.get("pieces_save", None)
                person_mostimportant_name = params.get("person_mostimportant_name", None)
                person_mostimportant_number = params.get("person_mostimportant_number", None)

                if inscription:
                    yupdated = YoungController().update(
                        idyoung = idyoung,
                        personal_names=personal_names,
                        personal_lastnames=personal_lastnames,
                        personal_email=personal_email,
                        personal_gender=personal_gender,
                        personal_dateborn=personal_dateborn,
                        personal_homephone=personal_homephone,
                        personal_mobilephone=personal_mobilephone,
                        personal_address=personal_address,
                        personal_occupation=personal_occupation,
                        personal_profession=personal_profession
                    )
                    if yupdated.get("result") == "ok" and yupdated.get("status") == 200:
                        idYoungUpdated = yupdated.get("bodyObject").get("id")
                        young = Young.objects.get(id=idYoungUpdated)
                        inscription.young = young
                    else:
                        return yupdated

                    if do_you_study:
                        inscription.do_you_study = do_you_study 
                    if carrer and carrer != inscription.carrer:
                        inscription.carrer = carrer
                    if school and school != inscription.school:
                        inscription.school = school
                    if do_you_work:
                        inscription.do_you_work = do_you_work 
                    if company and company != inscription.company:
                        inscription.company = company
                    if position_job and position_job != inscription.position_job:
                        inscription.position_job = position_job
                    if phone_company and phone_company != inscription.phone_company:
                        inscription.phone_company = phone_company
                    if life_with_gran:
                        inscription.life_with_gran = life_with_gran 
                    if life_with_parent:
                        inscription.life_with_parent = life_with_parent 
                    if life_with_only_mother:
                        inscription.life_with_only_mother = life_with_only_mother 
                    if life_with_only_father:
                        inscription.life_with_only_father = life_with_only_father 
                    if life_with_uncles:
                        inscription.life_with_uncles = life_with_uncles 
                    if life_with_friends:
                        inscription.life_with_friends = life_with_friends 
                    if life_with_cousins:
                        inscription.life_with_cousins = life_with_cousins 
                    if life_with_brothers:
                        inscription.life_with_brothers = life_with_brothers 
                    if life_with_alone:
                        inscription.life_with_alone = life_with_alone
                    if illness and illness != inscription.illness:
                        inscription.illness = illness
                    if especial_food and especial_food != inscription.especial_food:
                        inscription.especial_food = especial_food
                    if special_medicine and special_medicine != inscription.special_medicine:
                        inscription.special_medicine = special_medicine
                    if eps and eps != inscription.eps:
                        inscription.eps = eps
                    if who_invite_me and who_invite_me != inscription.who_invite_me:
                        inscription.who_invite_me = who_invite_me
                    if who_invite_me_number and who_invite_me_number != inscription.who_invite_me_number:
                        inscription.who_invite_me_number = who_invite_me_number
                    if do_you_want_ej:
                        inscription.do_you_want_ej = do_you_want_ej 
                    if why_fds and why_fds != inscription.why_fds:
                        inscription.why_fds = why_fds
                    
                    if other_experiences:
                        inscription.other_experiences = other_experiences 
                    if experiences_which and experiences_which != inscription.experiences_which:
                        inscription.experiences_which = experiences_which
                    if pieces_save and pieces_save != inscription.pieces_save:
                        inscription.pieces_save = pieces_save
                    if person_mostimportant_name and person_mostimportant_name != inscription.person_mostimportant_name:
                        inscription.person_mostimportant_name = person_mostimportant_name
                    if person_mostimportant_number and person_mostimportant_number != inscription.person_mostimportant_number:
                        inscription.person_mostimportant_number = person_mostimportant_number
                    inscription.save() 
                    insSerializer = InscriptionSerializerAll(inscription)
                    data = {'bodyObject': insSerializer.data, 'statusText': 'Se ha actualizado exitosamente.', 'result': 'ok', 'status':status.HTTP_200_OK }
                    return data
            else:
                return auth
        except Inscription.DoesNotExist:
            data = {'bodyObject':{}, 'result': 'error','statusText': 'No se pudo actualizar esta inscripción', 'status':status.HTTP_400_BAD_REQUEST}
            return data
    
