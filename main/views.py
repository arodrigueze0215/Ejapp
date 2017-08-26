# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render, get_object_or_404
from django.template import loader
from django.http import HttpResponse, JsonResponse
from .models import FdsEvents
from django.utils import timezone


def inscriptions_add(request, nFds):
    template= loader.get_template('inscrip.html')
    Fds = get_object_or_404(FdsEvents, number_fds=nFds)
    now = timezone.now()
    if Fds:
        if now < Fds.date_start:
            print "Fds está vigente"
            context = {
                'Fds': Fds
            }
            return HttpResponse(template.render(context, request))
        elif now > Fds.date_end:
            return render('inscription_nofound.html')
            print "Fds pasó"
    

    return render('inscription_nofound.html')

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

