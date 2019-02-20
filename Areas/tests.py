# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.test import (
    APITestCase,
    APIRequestFactory,
    force_authenticate
)
from django.urls import reverse
from api.views import AreasList
from main.models import (
    Areas,
    Young,
    Found
)
from django.contrib.auth.models import User

class ListAreasTest(APITestCase):
    def setUp(self):
        area = Areas.objects.create(name="Pre")
        Areas.objects.create(name="Post")
        Areas.objects.create(name="Padres")
        Areas.objects.create(name="Apostolado")
        Areas.objects.create(name="Ninguna")
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

    def test_listAreas(self):
        url = reverse("api:list_areas")
        factory = APIRequestFactory()
        view = AreasList.as_view()
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
        self.assertEqual(bodyObject[0].get("name"), "Pre")
        print ("::[OK]:: test_listAreas")
