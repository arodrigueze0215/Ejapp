# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from Ejapp import settings
from django.shortcuts import render, get_object_or_404
from django.template import loader
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, JsonResponse
from django.core.exceptions import ObjectDoesNotExist
from .models import (FdsEvents, Young, Inscription, Parents, Brothers)
from django.utils import timezone
from django.contrib.auth.models import User
import json
from django.urls import reverse
def inscriptions_add(request):
    if request.method == 'POST' and request.is_ajax():
        nFds = request.GET.get('fds',None)
        city = request.GET.get('ciudad',None)
        Fds = FdsEvents.objects.get(number_fds=nFds,city_fds=city)
        if settings.DEBUG == True:
            print("POST: ", request.POST)
        current_date = request.POST.get('current_date', None)
        personal_gender = request.POST.get('personal_gender', None)
        personal_names = request.POST.get('personal_names', None)
        personal_lastnames = request.POST.get('personal_lastnames', None)
        personal_dateborn = request.POST.get('personal_dateborn', None)
        personal_homephone = request.POST.get('personal_homephone', None)
        personal_mobilephone = request.POST.get('personal_mobilephone', None)
        personal_address = request.POST.get('personal_address', None)
        personal_email = request.POST.get('personal_email', None)
        personal_occupation = request.POST.get('personal_occupation', None)
        personal_profession = request.POST.get('personal_profession', None)
        life_with_gran = request.POST.get('life_with_gran', None)
        life_with_parent = request.POST.get('life_with_parent', None)
        life_with_only_mother = request.POST.get('life_with_only_mother', None)
        life_with_only_father = request.POST.get('life_with_only_father', None)
        life_with_uncles = request.POST.get('life_with_uncles', None)
        life_with_friends = request.POST.get('life_with_friends', None)
        life_with_cousins = request.POST.get('life_with_cousins', None)
        life_with_brothers = request.POST.get('life_with_brothers', None)
        life_with_alone = request.POST.get('life_with_alone', None)
        study = request.POST.get('study', None)
        study_carrer = request.POST.get('study_carrer', None)
        study_where = request.POST.get('study_where', None)
        work = request.POST.get('work', None)
        work_company = request.POST.get('work_company', None)
        work_role = request.POST.get('work_role', None)
        work_phone = request.POST.get('work_phone', None)
        dad = request.POST.get('dad', None)
        dad_names = request.POST.get('dad_names', None)
        dad_ocupation = request.POST.get('dad_ocupation', None)
        dad_phone_home = request.POST.get('dad_phone_home', None)
        dad_phone = request.POST.get('dad_phone', None)
        dad_address = request.POST.get('dad_address', None)
        mom = request.POST.get('mom', None)
        mom_names = request.POST.get('mom_names', None)
        mom_ocupation = request.POST.get('mom_ocupation', None)
        mom_phone_home = request.POST.get('mom_phone_home', None)
        mom_phone = request.POST.get('mom_phone', None)
        mom_address = request.POST.get('mom_address', None)
        brothers = request.POST.get('brothers', None)
        health_illnes = request.POST.get('health_illnes', None)
        health_food = request.POST.get('health_food', None)
        whoIntiveMe = request.POST.get('whoIntiveMe', None)
        whoIntiveMeNumber = request.POST.get('whoIntiveMeNumber', None)
        whyFds = request.POST.get('whyFds', None)
        wantFds = request.POST.get('wantFds', None)
        otherExperiences = request.POST.get('otherExperiences', None)
        otherExperiences_which = request.POST.get('otherExperiences_which', None)
        person_mostimportant_name = request.POST.get('person_mostimportant_name', None)
        person_mostimportant_number = request.POST.get('person_mostimportant_number', None)
        health_medicine = request.POST.get('health_medicine', None)
        health_eps = request.POST.get('health_eps', None)
        if personal_names and personal_lastnames and personal_email and personal_dateborn:
            if User.objects.filter(username=personal_email).exists():
                return JsonResponse({'result': 'error','message': 'Ya existe un usuario con este correo', 'data_register':{'name': personal_names, 'email': personal_email}})
            else:
                young = Young()
                user = User.objects.create_user(username=personal_email, email=personal_email)
                user.first_name = personal_names
                user.last_name = personal_lastnames
                user.save()
                young.user = user
                young.date_born = personal_dateborn
                if personal_homephone:
                    young.home_phone = personal_homephone
                if personal_mobilephone:
                    young.mobile_phone = personal_mobilephone
                if personal_address:
                    young.address = personal_address
                if personal_profession:
                    young.profession = personal_profession
                if personal_occupation:
                    young.occupation = personal_occupation
                if personal_gender:
                    young.gender = personal_gender
                young.save()
                inscription = Inscription()
                inscription.young = young
                inscription.inscription_date = current_date
                if Fds:
                    inscription.fdsEvent = Fds
                    inscription.city = Fds.city_fds
                else:
                    """TODO: Modificar esto después para no quemar este valor de esta manera"""
                    inscription.city = "Sin ciudad"
                if study=='true':
                    inscription.do_you_study = True
                if study_carrer:
                    inscription.carrer = study_carrer
                if study_where:
                    inscription.school = study_where
                if work=='true':
                    inscription.do_you_work = True     
                if work_company:
                    inscription.company = work_company     
                if work_role:
                    inscription.position_job = work_role     
                if work_role:
                    inscription.position_job = work_role     
                if work_phone:
                    inscription.position_job = work_phone
                if life_with_gran=='true':
                    inscription.life_with_gran = True     
                if life_with_parent=='true':
                    inscription.life_with_parent = True     
                if life_with_only_father=='true':
                    inscription.life_with_only_father = True     
                if life_with_only_mother=='true':
                    inscription.life_with_only_mother = True     
                if life_with_only_mother=='true':
                    inscription.life_with_only_mother = True     
                if life_with_uncles=='true':
                    inscription.life_with_uncles = True     
                if life_with_friends=='true':
                    inscription.life_with_friends = True     
                if life_with_cousins=='true':
                    inscription.life_with_cousins = True     
                if life_with_brothers=='true':
                    inscription.life_with_brothers = True     
                if life_with_alone=='true':
                    inscription.life_with_alone = True     
                if health_illnes:
                    inscription.illness = health_illnes     
                if health_food:
                    inscription.especial_food = health_food     
                if health_medicine:
                    inscription.special_medicine = health_medicine
                if health_eps:
                    inscription.eps = health_eps
                if whoIntiveMe:
                    inscription.who_invite_me = whoIntiveMe     
                if whoIntiveMeNumber:
                    inscription.who_invite_me_number = whoIntiveMeNumber     
                if wantFds=='true':
                    inscription.do_you_want_ej = True     
                if whyFds:
                    inscription.why_fds = whyFds     
                if otherExperiences=='true':
                    inscription.other_experiences = True
                if otherExperiences_which:
                    inscription.experiences_which = otherExperiences_which
                if person_mostimportant_name:
                    inscription.person_mostimportant_name = person_mostimportant_name
                else:
                    inscription.person_mostimportant_name = 'person_mostimportant_name'
                    
                if person_mostimportant_number:
                    inscription.person_mostimportant_number = person_mostimportant_number
                else:
                    inscription.person_mostimportant_number = '000'
                inscription.save()

                """add mom"""
                if mom_names:
                    mom_parent = Parents()
                    mom_parent.young = young
                    mom_parent.relationship = "1"
                    mom_parent.name_parent = mom_names
                    if mom=='false':
                        mom_parent.isalive = False
                    if mom_ocupation:
                        mom_parent.occupation = mom_ocupation
                    if mom_phone_home:
                        mom_parent.home_phone = mom_phone_home
                    if mom_phone:
                        mom_parent.mobile_phone = mom_phone
                    if mom_address:
                        mom_parent.address = mom_address
                    mom_parent.save()
                """add dad"""
                if dad_names:
                    dad_parent = Parents()
                    dad_parent.young = young
                    dad_parent.relationship = "2"
                    dad_parent.name_parent = dad_names
                    if dad=='false':
                        dad_parent.isalive = False
                    if dad_ocupation:
                        dad_parent.occupation = dad_ocupation
                    if dad_phone_home:
                        dad_parent.home_phone = dad_phone_home
                    if dad_phone:
                        dad_parent.mobile_phone = dad_phone
                    if dad_address:
                        dad_parent.address = dad_address
                    dad_parent.save()

                if brothers:
                    brothers = json.loads(brothers)
                    for bro in brothers:
                        brother = Brothers()
                        brother.young = young
                        brother.name_brother = bro['names']
                        if bro['email']:
                            brother.email = bro['email']
                        if bro['date']:
                            brother.date_born = bro['date']
                        if bro['phone']:
                            brother.mobile_phone = bro['phone']
                        if bro['relation']:
                            brother.relationship = bro['relation']
                        brother.save()
                return JsonResponse({'result': 'ok', 'message':'Tu registro terminó satisfactoriamente', 'data_register':{'name': personal_names, 'fds': nFds}})
        else:
            return JsonResponse({'result': 'error', 'message':'Hay datos obligatorios que hacen falta', 'data_register':{'name': personal_names, 'fds': nFds}})

    else:
        template= loader.get_template('inscription.html')
        templateNoFound= loader.get_template('inscription_nofound.html')
        try:
            nFds = request.GET.get('fds',None)
            city = request.GET.get('ciudad',None)
            if settings.DEBUG == True:
                print("nFds: ", nFds)
                print("Ciudad: ", city)
                
            Fds = get_object_or_404(FdsEvents, number_fds=nFds, city_fds=city)
            if settings.DEBUG == True:
                print("FDS: ", Fds)
            now = timezone.now()
            if Fds:
                if now < Fds.date_start:
                    if Fds.is_active==True:
                        if Fds.is_form_active==True:
                            if settings.DEBUG == True:
                                print("Fds esta vigente")
                                print("RELATIONS: ", Brothers._RELATIONS)
                                print("Is active: ", Fds.is_active)
                            
                            context = {
                                'Fds': Fds,
                                'relations': Brothers._RELATIONS
                            }
                            return HttpResponse(template.render(context, request))
                        else:
                            """No está habilitado el fds"""
                            contextNoFds = {
                                'title': 'Hola',
                                'message': 'Está ficha de inscripción aún no está habilitado.',
                            }
                            return HttpResponse(templateNoFound.render(contextNoFds, request))
                    else:
                        """El fds fue eliminado lógicamente"""
                        contextNoFds = {
                            'title': 'Hola',
                            'message': 'No existe un Fds activo por ahora.',
                        }
                        return HttpResponse(templateNoFound.render(contextNoFds, request))
                elif now > Fds.date_end:
                    if settings.DEBUG == True:
                        print("Fds vencido")
                    contextNoFds = {
                        'title': 'Hola',
                        'message': 'Desafortunádamente la fecha limite para inscripción ha pasado. El FDS ya terminó',
                    }
                    return HttpResponse(templateNoFound.render(contextNoFds, request))
                else:
                    if settings.DEBUG == True:
                        print("Fds en progreso")
                        print(str(now) +" == "+str(Fds.date_start)+" == "+str(Fds.date_end))
                    contextNoFds = {
                        'title': 'Hola',
                        'message': 'Desafortunádamente la fecha limite para inscripción ha pasado. El FDS está en curso.',
                    }
                    return HttpResponse(templateNoFound.render(contextNoFds, request))
            else:
                contextNoFds = {
                    'title': 'Hola',
                    'message': 'Desafortunádamente El FDS no existe.',
                }
                return HttpResponse(templateNoFound.render(contextNoFds, request))
        except FdsEvents.DoesNotExist:
            contextNoFds = {
                'title': 'Hola',
                'message': 'Desafortunádamente El FDS no existe.',
            }
            return HttpResponse(templateNoFound.render(contextNoFds, request))

@login_required(login_url='/login/')
def list_fds(request):
    if request.method == 'POST':
        if request.is_ajax():
            method = request.POST.get('method', None)
            if settings.DEBUG == True:
                    print("Method", method)
            if method == 'POST':
                name = request.POST.get('name_fds')
                number = request.POST.get('number_fds')
                startDate = request.POST.get('startdate_fds')
                endDate = request.POST.get('enddate_fds')
                if settings.DEBUG == True:
                    print("startDate", startDate)
                if number:
                    try:
                        numberFds = FdsEvents.objects.filter(number_fds=number)
                        if len(numberFds)==0:
                            if name and startDate and endDate:
                                newFDS = FdsEvents()
                                newFDS.name = name
                                newFDS.number_fds = number
                                newFDS.date_start = startDate
                                if settings.DEBUG == True:
                                    print("start date", startDate)
                                newFDS.date_end = endDate
                                newFDS.city_fds = "Pereira"
                                newFDS.save()
                                return JsonResponse({'result': 'ok', 'message':'Se creó un Nuevo FDS'})
                            else:
                                return JsonResponse({'result': 'error', 'message':'todos los campos son abligatorios'})
                        else:
                            return JsonResponse({'result': 'error', 'message':'Este Fds ya existe'})
                    except FdsEvents.DoesNotExist:
                            return JsonResponse({'result': 'error', 'message':'Este Fds No existe'})
            elif method == 'DELETE':
                fds = request.POST.get('id_fds')
                if settings.DEBUG == True:
                    print("number_fds requestPost", fds)
                if fds:
                    try:
                        Fds = get_object_or_404(FdsEvents, id=fds)
                        Fds.is_active = False
                        Fds.save()
                        text = "El FDS #"+Fds.number_fds+"Fue eliminado exitosamente"
                        return JsonResponse({'result': 'ok', 'message':text})
                    except FdsEvents.DoesNotExist:
                        return JsonResponse({'result': 'error', 'message':'Este Fds No existe'})
                else:
                    return JsonResponse({'result': 'error', 'message':'No se encontró un FDS correcto'})
            elif method == 'PUT':
                name = request.POST.get('name_fds', None)
                idFds = request.POST.get('id_fds', None)
                number = request.POST.get('number_fds', None)
                startDate = request.POST.get('startdate_fds', None)
                endDate = request.POST.get('enddate_fds', None)
                if idFds:
                    try:
                        Fds = get_object_or_404(FdsEvents, id=idFds)
                        if idFds:
                            if name:
                                Fds.name = name
                            if number:
                                Fds.number_fds = number
                            if startDate:
                                Fds.date_start = startDate
                            if endDate:
                                Fds.date_end = endDate
                            "TODO: remove static set"
                            Fds.city_fds = "Pereira"

                            Fds.save()
                            return JsonResponse({'result': 'ok', 'message':'Se actualizó correctamente'})                           
                        else:
                            return JsonResponse({'result': 'error', 'message':'No se encontró un Fds correcto'})
                    except FdsEvents.DoesNotExist:
                        return JsonResponse({'result': 'error', 'message':'Este Fds No existe'})
                return JsonResponse({'result': 'error', 'message':'Este Fds No existe'})
    else:
        template= loader.get_template('fds-list.html')
        numberFds = FdsEvents.objects.filter(city_fds="Pereira", is_active=True)
        context = None
        if len(numberFds) > 0:
            context = {
                'fdsList': numberFds
            }
        return HttpResponse(template.render(context, request))

@login_required(login_url='/login/')
def enable_inscriptions(request):
    if request.method == 'POST':
        if request.is_ajax():
            is_form = request.POST.get('is_form', None)
            fds_id = request.POST.get('fds_id', None)
            if settings.DEBUG == True:
                print("is_form", is_form)
                print("fds_id", str(fds_id))

            if is_form is not None and fds_id is not None:
                Fds = get_object_or_404(FdsEvents, id=fds_id)
                if settings.DEBUG == True:
                    print("Fds found to enable inscription", Fds)
                if Fds:
                    if is_form=="True":
                        Fds.is_form_active = True
                        Fds.save()
                        path = reverse("main:inscriptions_add")+"?fds="+Fds.number_fds+";ciudad="+Fds.city_fds
                        url = request.META['HTTP_ORIGIN']+path
                        
                        if settings.DEBUG == True:
                            print("Fds saved True: ", str(Fds))
                            print("url: ", str(url))
                        return JsonResponse({'result': 'ok', 'message':'Ficha de inscripción habilitada', 'active':'true', 'url':url})
                    else:
                        Fds.is_form_active = False
                        Fds.save()
                        if settings.DEBUG == True:
                            print("Fds saved False: ", Fds)
                        return JsonResponse({'result': 'ok', 'message':'Ficha de inscripción deshabilitada', 'active':'false'})

                else:
                    """El Fds no es valido"""
                    return JsonResponse({'result': 'error', 'message':'El Fds seleccionado no es valido', 'active':'false'})
            else:
                """ Datos de post no son validos"""
                return JsonResponse({'result': 'error', 'message':'El Fds seleccionado no es valido', 'active':'false'})

@login_required(login_url='/login/')
def get_url_inscription(request):
    if request.method == 'POST':
        if request.is_ajax():
            fds_id = request.POST.get('fds_id', None)
            if settings.DEBUG == True:
                print("fds_id", str(fds_id))

            if fds_id is not None:
                Fds = get_object_or_404(FdsEvents, id=fds_id)
                if settings.DEBUG == True:
                    print("Fds found to enable inscription", str(Fds))
                if Fds:
                    path = reverse("main:inscriptions_add")+"?fds="+Fds.number_fds+";ciudad="+Fds.city_fds
                    url = request.META['HTTP_ORIGIN']+path
                        
                    if settings.DEBUG == True:
                        print("Fds get url: ", str(Fds))
                        print("url: ", url)
                    return JsonResponse({'result': 'ok', 'message':'Ficha de inscripción habilitada', 'url':url})
                else:
                    Fds.is_form_active = False
                    Fds.save()
                    if settings.DEBUG == True:
                        print("Fds saved False: ", str(Fds))
                    return JsonResponse({'result': 'ok', 'message':'Ficha de inscripción deshabilitada'})

            else:
                """El Fds no es valido"""
                return JsonResponse({'result': 'error', 'message':'El Fds seleccionado no es valido'})
        else:
            """ Datos de post no son validos"""
            return JsonResponse({'result': 'error', 'message':'El Fds seleccionado no es valido'})
    else:
        """ Datos de post no son validos"""
        return JsonResponse({'result': 'error', 'message':'El Fds seleccionado no es valido'})

@login_required(login_url='/login/')
def inscriptions_list(request):
    return render(request, 'inscriptions_list.html')

@login_required(login_url='/login/')
def inscription_detail(request):
    return render(request, 'inscription_details.html')

def result_inscription(request):
    return render(request, 'result_inscription.html')
    
@login_required(login_url='/login/')
def updateInscription(request):
    return render(request, 'update_inscriptions.html')

@login_required(login_url='/login/')
def formNewEmptyFounder(request):
    return render(request, 'form_new_empty_founder.html')
