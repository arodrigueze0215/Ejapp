# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.test import (
    APITestCase,
    APIRequestFactory,
    force_authenticate
)
from django.urls import reverse

from main.models import (
    Areas,
    Young,
    Found,
    EjCities
)
from api.views import CitiesList
from django.contrib.auth.models import User

class ListCitiesTest(APITestCase):
    def setUp(self):
        area = Areas.objects.create(name="Pre")
        cities = EjCities.objects.create(name="Pereira")
        EjCities.objects.create(name="Manizales")
        EjCities.objects.create(name="Armenia")
        self.user = User.objects.create(username="arodrigueze", email="andres.rodriguez0215@gmail.com")
        young = Young.objects.create(
            user=self.user, 
            date_born="1994-05-24", 
            home_phone="3428744", 
            mobile_phone="3044643222",
            address="Manzana 15 casa 138 Villa campestre, Dosquebradas",
            occupation="Desarrollador",
            profession="Ingeniero de sistemas",
            gender="1"
        )
        Found.objects.create(
            young=young,  
            number_fds="36", 
            city_fds="Pereira",
            active_city="Pereira",
            area=area,
            name_parent_fds="Echeverry"
        )
    def test_listCities(self):
        url = reverse("api:list_cities")
        factory = APIRequestFactory()
        view = CitiesList.as_view()
        request = factory.get(url)        
        request.user = self.user
        force_authenticate(request, user=self.user)
        response = view(request)
        jsonRes = response.data
        bodyObject =jsonRes.get("bodyObject",None)
        status =jsonRes.get("status",None)
        result =jsonRes.get("result",None)
        self.assertEqual(status, 200)
        self.assertEqual(result, "ok")
        self.assertEqual(len(bodyObject)>0, True)
        self.assertEqual(bodyObject[0].get("id"), 1)
        self.assertEqual(bodyObject[0].get("name"), "Pereira")
        print ("::[OK]:: test_lisCities")
