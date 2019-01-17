from __future__ import unicode_literals
from django.conf.urls import include
from django.urls import reverse
from django.contrib.auth.models import User
import json
from rest_framework.test import (
    APITestCase,
    APIRequestFactory,
    force_authenticate
)
from django.contrib.auth.models import User
from django.contrib.auth.models import Group
from api.views import (
    YoungList
)
from main.models import (
    Young
)

class ApiYoung(APITestCase):
    def setUp(self):
        user=User.objects.create(username="CoRo", first_name="Consuelo", last_name="Rodriguez", email="concha@gmail.com")
        user2=User.objects.create(username="ConEs", first_name="Consuelo", last_name="Escudero", email="coE@gmail.com")
        Young.objects.create(
            user=user, 
            date_born="1994-05-24", 
            home_phone="3428744", 
            mobile_phone="3044643222",
            address="Manzana 15 casa 138 Villa campestre, Dosquebradas",
            occupation="Desarrollador",
            profession="Ingeniero de sistemas",
            gender="2"
        )
        Young.objects.create(
            user=user2, 
            date_born="1994-05-24", 
            home_phone="3428744", 
            mobile_phone="3044643222",
            address="Manzana 15 casa 138 Villa campestre, Dosquebradas",
            occupation="Desarrollador",
            profession="Ingeniero de sistemas",
            gender="2"
        )
    def test_listYoung(self):
        factory = APIRequestFactory()
        view = YoungList.as_view()
        data = {
            'first_name':'Consuelo',
        }
        request = factory.post(reverse("api:young_list_filtered"), data)
        response = view(request)
        jsonRes = response.data
        bodyObj= jsonRes.get("bodyObject")
        print("response_test: ", bodyObj)
        print("response_test: ", bodyObj[0].get("user"))
        print("........")
        print("response_test: ", bodyObj[1].get("user"))
        self.assertEqual(1==1,True)
