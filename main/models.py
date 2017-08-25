# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import User

class Young(models.Model):
    _GENDER = (
    ('1', 'MASCULINO'),
    ('2', 'FEMENINO'),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    date_born = models.CharField(max_length=255, blank=False)
    home_phone = models.CharField(max_length=50, blank=True)
    mobile_phone = models.CharField(max_length=50, blank=True)
    address = models.CharField(max_length=255, blank=True)
    occupation = models.CharField(max_length=255, blank=True)
    profession = models.CharField(max_length=255, blank=True)
    gender = models.CharField(max_length=50, choices=_GENDER, default="2")

class Inscription(models.Model):
    _PIECE = (
    ('1', 'DEBE'),
    ('2', 'ABONÓ'),
    ('3', 'PAGÓ'),
    )
    young = models.OneToOneField(Young, on_delete=models.CASCADE)
    city = models.CharField(max_length=255, blank=False)
    inscription_date = models.DateTimeField(auto_now_add=True)
    do_you_study = models.BooleanField(default=False)
    carrer = models.CharField(max_length=255, blank=True)
    school = models.CharField(max_length=255, blank=True)
    do_you_work = models.BooleanField(default=False)
    company = models.CharField(max_length=255, blank=True)
    position_job = models.CharField(max_length=255, blank=True)
    phone_company = models.CharField(max_length=50, blank=True)
    life_with_gran = models.BooleanField(default=False)
    life_with_parent = models.BooleanField(default=False)
    life_with_only_mother = models.BooleanField(default=False)
    life_with_only_father = models.BooleanField(default=False)
    life_with_uncles = models.BooleanField(default=False)
    life_with_friends = models.BooleanField(default=False)
    life_with_cousins = models.BooleanField(default=False)
    life_with_brothers = models.BooleanField(default=False)
    life_with_alone = models.BooleanField(default=False)
    illness = models.CharField(max_length=255, blank=True)
    especial_food = models.CharField(max_length=255, blank=True)
    who_intive_me = models.CharField(max_length=255, blank=False)
    who_intive_me_number = models.CharField(max_length=50, blank=True)
    do_you_want_ej = models.BooleanField(default=False)
    why_fds = models.CharField(max_length=999, blank=True)
    other_experiences = models.CharField(max_length=999, blank=True)
    pieces_save = models.CharField(max_length=50, choices=_PIECE, default="1")

class  Parents(models.Model):
    young = models.OneToOneField(Young, on_delete=models.CASCADE)
    realtionship = models.CharField(max_length=255, blank=False)
    name_parent = models.CharField(max_length=255, blank=False)
    occupation = models.CharField(max_length=255, blank=True)
    home_phone = models.CharField(max_length=50, blank=True)
    mobile_phone = models.CharField(max_length=50, blank=True)
    address = models.CharField(max_length=255, blank=True)
    isalive = models.BooleanField(default=True)

class Brothers (models.Model):
    young = models.OneToOneField(Young, on_delete=models.CASCADE)
    realtionship = models.CharField(max_length=255, blank=False)
    name_brother = models.CharField(max_length=255, blank=False)
    date_born = models.CharField(max_length=255, blank=False)
    mobile_phone = models.CharField(max_length=50, blank=True)
    email = models.CharField(max_length=255, blank=True)
    isalive = models.BooleanField(default=True)

class Areas(models.Model):
    name = models.CharField(max_length=255, blank=False)

class EjCities(models.Model):
    name = models.CharField(max_length=255, blank=False)

class Found(models.Model):
    _STATES = (
    ('1', 'Activo'),
    ('2', 'Inactivo')
    )
    young = models.OneToOneField(Young, on_delete=models.CASCADE)
    state = models.CharField(max_length=50, choices=_STATES, default="1") 
    number_fds = models.CharField(max_length=10, blank=False)  
    city_fds = models.CharField(max_length=255, blank=False)
    active_city = models.CharField(max_length=255, blank=True)
    area = models.ForeignKey(Areas,blank=False, default=None)
    name_parent_fds = models.CharField(max_length=255, blank=True)


class FdsEvents(models.Model):
    name = models.CharField(max_length=255, blank=False)
    number_fds = models.CharField(max_length=10, blank=False)
    date_start = models.DateTimeField(blank=False)
    date_end = models.DateTimeField(blank=False)
    city_fds = models.CharField(max_length=255, blank=False)
    is_form_active = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

class StaffRoleFds(models.Model):
    name = models.CharField(max_length=255, blank=False)
    role = models.CharField(max_length=255, blank=False)

class StaffFds(models.Model):
    found = models.ForeignKey(Found,blank=False, default=None)
    fds_event = models.ForeignKey(FdsEvents,blank=False, default=None)
    staff = models.ForeignKey(StaffRoleFds,blank=False, default=None)


