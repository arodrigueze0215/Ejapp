# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from main.models import (Young)

"""Return the list Youngs whos registered by inscriptions form before"""
def getListYoung(request, **params):
    try:
        fName = params.get("first_name",None)
        lName = params.get("last_name", None)
        email = params.get("email", None)
        users = None
        if fName is not None and lName is not None and email is not None:
            users = User.objects.filter(first_name=fName, last_name=lName, email=email)
        elif fName is not None and lName is not None and:
            users = User.objects.filter(first_name=fName, last_name=lName)
        elif fName is not None and email is not None and:
            users = User.objects.filter(first_name=fName, email=email)
        elif lName is not None and email is not None and:
            users = User.objects.filter(last_name=lName, email=email)
        elif fName is not None:
            users = User.objects.filter(first_name=fName)
        elif lName is not None:
            users = User.objects.filter(last_name=lName)
        elif email is not None:
            users = User.objects.filter(email=email)
        else:
            pass
     except Young.DoesNotExist:
        pass