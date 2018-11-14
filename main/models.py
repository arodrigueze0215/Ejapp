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
    def __str__(self):
        return self.user.username.encode('utf-8')

class FdsEvents(models.Model):
    name = models.CharField(max_length=255, blank=False)
    number_fds = models.CharField(max_length=10, blank=False)
    date_start = models.DateTimeField(blank=False)
    date_end = models.DateTimeField(blank=False)
    city_fds = models.CharField(max_length=255, blank=False)
    is_form_active = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    def __str__(self):
        return str(self.name.encode("utf-8")+str(", FDS").encode("utf-8")+str(self.number_fds).encode("utf-8")+str(", ").encode("utf-8")+self.city_fds.encode("utf-8"))

class Inscription(models.Model):
    _PIECE = (
    ('1', 'DEBE'),
    ('2', 'ABONÓ'),
    ('3', 'PAGÓ'),
    )
    young = models.OneToOneField(Young, on_delete=models.CASCADE)
    fdsEvent = models.ForeignKey(FdsEvents, on_delete=models.CASCADE, default=0)
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
    special_medicine = models.CharField(max_length=255, blank=False, default="No")
    eps = models.CharField(max_length=255, blank=False, default="No")
    who_invite_me = models.CharField(max_length=255, blank=False)
    who_invite_me_number = models.CharField(max_length=50, blank=True)
    do_you_want_ej = models.BooleanField(default=False)
    why_fds = models.CharField(max_length=999, blank=True)
    other_experiences = models.BooleanField(default=False)
    experiences_which = models.CharField(max_length=999, blank=True)
    pieces_save = models.CharField(max_length=50, choices=_PIECE, default="1")
    person_mostimportant_name = models.CharField(max_length=255, blank=False, default="No")
    person_mostimportant_number = models.CharField(max_length=50, blank=False, default="No")

class  Parents(models.Model):
    _RELATION = (
    ('1', 'Mamá'),
    ('2', 'Papá'),
    )
    young = models.ForeignKey(Young, on_delete=models.CASCADE)
    relationship = models.CharField(max_length=255, choices=_RELATION, blank=False, default="2")
    name_parent = models.CharField(max_length=255, blank=False)
    occupation = models.CharField(max_length=255, blank=True)
    home_phone = models.CharField(max_length=50, blank=True)
    mobile_phone = models.CharField(max_length=50, blank=True)
    address = models.CharField(max_length=255, blank=True)
    isalive = models.BooleanField(default=True)

class Brothers (models.Model):
    _RELATIONS = (
    ('1', 'hermano'),
    ('2', 'hermana'),
    ('3', 'primo'),
    ('4', 'prima'),
    )
    young = models.ForeignKey(Young, on_delete=models.CASCADE)
    relationship = models.CharField(max_length=255, choices=_RELATIONS, default="1", blank=False)
    name_brother = models.CharField(max_length=255, blank=False)
    date_born = models.CharField(max_length=255, blank=False)
    mobile_phone = models.CharField(max_length=50, blank=True)
    email = models.CharField(max_length=255, blank=True)
    isalive = models.BooleanField(default=True)

class Areas(models.Model):
    name = models.CharField(max_length=255, blank=False)
    def __str__(self):
        return self.name

class EjCities(models.Model):
    name = models.CharField(max_length=255, blank=False)
    def __str__(self):
        return self.name

class Found(models.Model):
    _STATES = (
    ('1', 'Activo'),
    ('2', 'Inactivo')
    )
    young = models.OneToOneField(Young, on_delete=models.CASCADE)
    state = models.CharField(max_length=50, choices=_STATES, default="1") 
    number_fds = models.CharField(max_length=10, blank=False)  
    city_fds = models.CharField(max_length=255, blank=False)
    active_city = models.CharField(max_length=255, blank=False)
    area = models.ForeignKey(Areas,blank=False, default=None, on_delete=models.CASCADE)
    name_parent_fds = models.CharField(max_length=255, blank=True)
    def __str__(self):
        return self.young.user.first_name.encode("utf-8")+ b" - "+ self.young.user.last_name.encode("utf-8")+ b" - FDS"+str(self.number_fds).encode("utf-8")



class StaffRoleFds(models.Model):
    name = models.CharField(max_length=255, blank=False)
    role = models.CharField(max_length=255, blank=False)

class StaffFds(models.Model):
    found = models.ForeignKey(Found,blank=False, default=None, on_delete=models.CASCADE)
    fds_event = models.ForeignKey(FdsEvents,blank=False, default=None, on_delete=models.CASCADE)
    staff = models.ForeignKey(StaffRoleFds,blank=False, default=None, on_delete=models.CASCADE)


