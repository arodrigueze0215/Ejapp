# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.test import (
    APITestCase,
    APIRequestFactory,
    force_authenticate
)
from main.models import (
    Young,
    Found,
    Inscription,
    FdsEvents,
    Areas
)
from api.views import (
    InscriptionDetails
)

class InscriptionDetailsTest(APITestCase):

    def setUp(self):
        print "INIT --------------------------------------- [InscriptionDetailsTest] ---------------------------------------"
        area = Areas.objects.create(name="Pre")
        self.user = User.objects.create(username="andres.rodriguez0215@gmail.com", email="andres.rodriguez0215@gmail.com")
        self.user.first_name="Andres" 
        self.user.last_name="Rodriguez"
        self.user.set_password("test_ejapp")
        self.user.save()
        self.young = Young.objects.create(
            user=self.user, 
            date_born="1994-05-24", 
            home_phone="3428744", 
            mobile_phone="3044643222",
            address="Manzana 15 casa 138 Villa campestre, Dosquebradas",
            occupation="Desarrollador",
            profession="Ingeniero de sistemas",
            gender="1"
        )
        self.found = Found.objects.create(
            young=self.young, 
            state="1", 
            number_fds="36", 
            city_fds="Pereira",
            active_city="Pereira",
            area=area,
            name_parent_fds="Echeverry"
        )
        user=User.objects.create(first_name="consuelo", last_name="Rodriguez", email="concha@gmail.com")
        young = Young.objects.create(
            user=user, 
            date_born="1994-05-24", 
            home_phone="3428744", 
            mobile_phone="3044643222",
            address="Manzana 15 casa 138 Villa campestre, Dosquebradas",
            occupation="Desarrollador",
            profession="Ingeniero de sistemas",
            gender="2"
        )
        fds=FdsEvents.objects.create(
            name="FDS Test",
            number_fds="1",
            date_start="2018-08-09T03:52:30.076363Z",
            date_end="2018-08-12T03:52:30.076363Z",
            city_fds="Pereira",
            is_form_active=True,
        )
        Inscription.objects.create(
            young=young,
            fdsEvent=fds,
            city="Pereira",
            inscription_date="2018-07-09",
            who_invite_me="Daniela Castaño"
        )
    
    def test_getInscriptionDetail(self):
        factory = APIRequestFactory()
        view = InscriptionDetails.as_view()
        data = {
            'id':1,
            'idyoung':2
        }
        request = factory.get(reverse("api:inscription_details"), data)
        request.user = self.user
        force_authenticate(request, user=self.user)
        response = view(request)
        jsonRes = response.data
        status =jsonRes.get("status",None)
        result =jsonRes.get("result",None)
        bodyObject =jsonRes.get("bodyObject",None)
        youngObj =bodyObject.get("young",None)
        userObj =youngObj.get("user",None)
        self.assertEqual(status, 200)
        self.assertEqual(result, "ok")
        self.assertEqual(userObj.get("first_name", None), "consuelo")
        self.assertEqual(userObj.get("last_name", None), "Rodriguez")
        self.assertEqual(userObj.get("email", None), "concha@gmail.com")
        self.assertEqual(youngObj.get("id", None), 2)
        self.assertEqual(bodyObject.get("young", None)!=None, True)
        self.assertEqual(bodyObject.get("who_invite_me", None), "Daniela Castaño")
        print "test_getInscriptionDetail (GET INSCRIPTION): [OK]"


