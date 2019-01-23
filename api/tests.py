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
    """
    Test API
    """
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
    def test_listYoung_firstname(self):
        """
        test filtered by first name
        """
        factory = APIRequestFactory()
        view = YoungList.as_view()
        data = {
            'first_name':'Consuelo',
        }
        request = factory.post(reverse("api:young_list_filtered"), data)
        response = view(request)
        jsonRes = response.data
        bodyObj= jsonRes.get("bodyObject")
        status =jsonRes.get("status",None)
        result =jsonRes.get("result",None)
        statusText =jsonRes.get("statusText",None)
        user1 = bodyObj[0].get("user")
        user2 = bodyObj[1].get("user")
        self.assertEqual(status, 200)
        self.assertEqual(result, "ok")
        self.assertEqual(len(bodyObj)>0,True)
        self.assertEqual(user1.get("username"),"CoRo")
        self.assertEqual(user1.get("first_name"),"Consuelo")
        self.assertEqual(user1.get("last_name"),"Rodriguez")
        self.assertEqual(user1.get("email"),"concha@gmail.com")
        self.assertEqual(user2.get("username"),"ConEs")
        self.assertEqual(user2.get("first_name"),"Consuelo")
        self.assertEqual(user2.get("last_name"),"Escudero")
        self.assertEqual(user2.get("email"),"coE@gmail.com")
        print ("::[OK]:: test_listYoung_firstname")

    def test_listYoung_lastname(self):
        """
        test filtered by last name
        """
        factory = APIRequestFactory()
        view = YoungList.as_view()
        data = {
            'last_name':'Rodriguez',
        }
        request = factory.post(reverse("api:young_list_filtered"), data)
        response = view(request)
        jsonRes = response.data
        bodyObj= jsonRes.get("bodyObject")
        status =jsonRes.get("status",None)
        result =jsonRes.get("result",None)
        statusText =jsonRes.get("statusText",None)
        user1 = bodyObj[0].get("user")
        self.assertEqual(status, 200)
        self.assertEqual(result, "ok")
        self.assertEqual(len(bodyObj)>0,True)
        self.assertEqual(user1.get("username"),"CoRo")
        self.assertEqual(user1.get("first_name"),"Consuelo")
        self.assertEqual(user1.get("last_name"),"Rodriguez")
        self.assertEqual(user1.get("email"),"concha@gmail.com")
        print ("::[OK]:: test_listYoung_lastname")
