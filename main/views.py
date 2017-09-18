# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render, get_object_or_404
from django.template import loader
from django.http import HttpResponse, JsonResponse
from django.core.exceptions import ObjectDoesNotExist
from .models import (FdsEvents, Young, Inscription)
from django.utils import timezone
from django.contrib.auth.models import User


def inscriptions_add(request, nFds):
    Fds = FdsEvents.objects.get(number_fds=nFds)
    if request.method == 'POST' and request.is_ajax():
        print "POST: ", request.POST
        personal_gender = request.POST.get('personal_gender', None)
        personal_names = request.POST.get('personal_names', None)
        personal_lastnames = request.POST.get('personal_lastnames', None)
        personal_dateborn = request.POST.get('personal_dateborn', None)
        personal_homephone = request.POST.get('personal_homephone', None)
        personal_mobilephone = request.POST.get('personal_mobilephone', None)
        personal_address = request.POST.get('personal_address', None)
        personal_email = request.POST.get('personal_email', None)
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
        brothers = request.POST.getlist('brothers')
        health_illnes = request.POST.get('health_illnes', None)
        health_food = request.POST.get('health_food', None)
        whoIntiveMe = request.POST.get('whoIntiveMe', None)
        whoIntiveMeNumber = request.POST.get('whoIntiveMeNumber', None)
        whyFds = request.POST.get('whyFds', None)
        wantFds = request.POST.get('wantFds', None)
        otherExperiences = request.POST.get('otherExperiences', None)
        otherExperiences_which = request.POST.get('otherExperiences_which', None)
        if personal_names and personal_lastnames and personal_email and personal_dateborn:
            young = Young()
            inscription = Inscription()
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
            if personal_gender:
                young.gender = personal_gender
            young.save()
            inscription.young = young
            if Fds:
                inscription.city = Fds.city_fds
            else:
                """TODO: Modificar esto después para no quemar este valor de esta manera"""
                inscription.city = "Sin ciudad"
            if study:
                inscription.do_you_study = study
            if study_carrer:
                inscription.carrer = study_carrer
            if study_where:
                inscription.school = study_where
            if work:
                inscription.do_you_work = work     
            if work_company:
                inscription.company = work_company     
            if work_role:
                inscription.position_job = work_role     
            if work_role:
                inscription.position_job = work_role     
            if work_phone:
                inscription.position_job = work_phone
            if life_with_gran:
                inscription.life_with_gran = life_with_gran     
            if life_with_parent:
                inscription.life_with_parent = life_with_parent     
            if life_with_only_father:
                inscription.life_with_only_father = life_with_only_father     
            if life_with_only_mother:
                inscription.life_with_only_mother = life_with_only_mother     
            if life_with_only_mother:
                inscription.life_with_only_mother = life_with_only_mother     
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
            if health_illnes:
                inscription.illness = health_illnes     
            if health_food:
                inscription.health_food = health_food     
            if whoIntiveMe:
                inscription.who_invite_me = whoIntiveMe     
            if whoIntiveMeNumber:
                inscription.who_invite_me_number = whoIntiveMeNumber     
            if wantFds:
                inscription.do_you_want_ej = wantFds     
            if whyFds:
                inscription.why_fds = whyFds     
            if otherExperiences:
                inscription.other_experiences = otherExperiences
            inscription.save()
            return JsonResponse({'result': 'ok', 'message':'Tu registro terminó satisfactoriamente' 'data_register':{'name': personal_names, 'last_name': personal_lastnames}})
        else:
            return JsonResponse({'result': 'error', 'message':'Hay datos obligatorios que hacen falta'})

    else:
        template= loader.get_template('inscription.html')
        try:
            now = timezone.now()
            if Fds:
                if now < Fds.date_start:
                    print "Fds está vigente"
                    context = {
                        'Fds': Fds
                    }
                    return HttpResponse(template.render(context, request))
                elif now > Fds.date_end:
                    return render(request, 'inscription_nofound.html')
                    print "Fds pasó"
            return render(request, 'inscription_nofound.html')
        except FdsEvents.DoesNotExist:
            return render(request, 'inscription_nofound.html')


def list_fds(request):
    if request.method == 'POST':
        if request.is_ajax():
            name = request.POST.get('name_fds')
            number = request.POST.get('number_fds')
            startDate = request.POST.get('startdate_fds')
            endDate = request.POST.get('enddate_fds')
            print "startDate", startDate
            if number:
                try:
                    numberFds = FdsEvents.objects.filter(number_fds=number)
                    if len(numberFds)==0:
                        if name and startDate and endDate:
                            newFDS = FdsEvents()
                            newFDS.name = name
                            newFDS.number_fds = number
                            newFDS.date_start = startDate
                            print "start date", startDate
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



            return JsonResponse({'result': 'ok'})
    else:
        template= loader.get_template('fds-list.html')
        numberFds = FdsEvents.objects.filter(city_fds="Pereira")
        context = None
        if len(numberFds) > 0:
            context = {
                'fdsList': numberFds
            }
        """print "Context", context"""
        return HttpResponse(template.render(context, request))


def enable_inscriptions(request):
    if request.method == 'POST':
        if request.is_ajax():
            is_form = request.POST.get('is_form', None)
            fds_id = request.POST.get('fds_id', None)
            if is_form is not None and fds_id is not None:
                Fds = get_object_or_404(FdsEvents, id=fds_id)
                if Fds:
                    if is_form=="True":
                        Fds.is_form_active = "True"
                        Fds.save()
                        return JsonResponse({'result': 'ok', 'message':'Ficha de inscripción habilitada'})
                    else:
                        Fds.is_form_active = "False"
                        Fds.save()
                        return JsonResponse({'result': 'ok', 'message':'Ficha de inscripción deshabilitada'})

                else:
                    """El Fds no es valido"""
                    return JsonResponse({'result': 'error', 'message':'El Fds seleccionado no es valido'})
            else:
                """ Datos de post no son validos"""
                return JsonResponse({'result': 'error', 'message':'El Fds seleccionado no es valido'})

