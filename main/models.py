# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import User

class Young(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user')
    date_born = models.CharField(max_length=255, blank=False)
    home_phone = models.CharField(max_length=50, blank=True)
    mobile_phone = models.CharField(max_length=50, blank=True)
    address = models.CharField(max_length=255, blank=True)
    occupation = models.CharField(max_length=255, blank=True)
    profession = models.CharField(max_length=255, blank=True)

class Inscription(models.Model):
    _LIFE_WITH = (
    ('1', 'Abuelos'),
    ('2', 'Padres'),
    ('3', 'Solo madre'),
    ('4', 'Solo padre'),
    ('5', 'Tios'),
    ('6', 'Amigos'),
    ('7', 'Primos'),
    ('8', 'Hermanos'),
    ('9', 'Solo'),
    )
    _PIECE = (
    ('1', 'DEBE'),
    ('2', 'ABONÓ'),
    ('3', 'PAGÓ'),
    )
    young = models.OneToOneField(Young, on_delete=models.CASCADE, related_name='young')
    city = models.CharField(max_length=255, blank=False)
    inscription_date = models.DateTimeField(auto_now_add=True)
    do_you_study = models.BooleanField(default=False)
    carrer = models.CharField(max_length=255, blank=True)
    school = models.CharField(max_length=255, blank=True)
    do_you_work = models.BooleanField(default=False)
    company = models.CharField(max_length=255, blank=True)
    position_job = models.CharField(max_length=255, blank=True)
    phone_company = models.CharField(max_length=50, blank=True)
    life_with = models.CharField(max_length=50, choices=_LIFE_WITH, default="2")
    illness = models.CharField(max_length=255, blank=True)
    especial_food = models.CharField(max_length=255, blank=True)
    who_intive_me = models.CharField(max_length=255, blank=False)
    who_intive_me_number = models.CharField(max_length=50, blank=True)
    why_fds = models.CharField(max_length=999, blank=True)
    other_experiences = models.CharField(max_length=999, blank=True)
    pieces_save = models.CharField(max_length=50, choices=_PIECE, default="1")
