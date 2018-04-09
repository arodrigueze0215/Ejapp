# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.conf.urls import include
from django.urls import reverse
from django.utils import six
import json
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from django.contrib.auth.models import Group
from main.models import (Young, Found, Areas)

class FoundsTests(APITestCase):
    young = None
    def setUp(self):
        Areas.objects.create(name="Pre")
        Group.objects.create(name="Pereira")
        user=User.objects.create(first_name="Andres", last_name="Rodriguez", email="andres.rodriguez0215@gmail.com")
        self.young = Young.objects.create(
                        user=user, 
                        date_born="1994-05-24", 
                        home_phone="3428744", 
                        mobile_phone="3044643222",
                        address="Manzana 15 casa 138 Villa campestre, Dosquebradas",
                        occupation="Desarrollador",
                        profession="Ingeniero de sistemas",
                        gender="1"

                    )
        

    def test_newFoundWithYoung(self):
        """
        Ensure create a new Found with a young created before
        """
        url = reverse("api:new_found_young")
        data = {
            'idyoung': self.young.id,
            'state': '2',
            'number_fds': '36',
            'city_fds': 'Pereira',
            'active_fds': 'Pereira',
            'area': '1',
            'name_parent_fds': 'Echeverry',
            'password':'test_ejapp',
        }
        response = self.client.post(url, data, format='json')
        response_content = response.content
        if six.PY3:
            response_content = str(response_content, encoding='utf8')
        
        """ Parser JSON"""
        jsonRes = json.loads(response_content)
        print "jsonRes: ", jsonRes
        bodyObject =jsonRes.get("bodyObject",None)
        jsonYoung = bodyObject.get("young", None)
        jsonArea = bodyObject.get("area", None)
        jsonUser = jsonYoung.get("user", None)

        """
        assert
        """
        self.assertEqual(response.status_code, 200)
        self.assertEqual(jsonRes.get("status",None), 200)
        self.assertEqual(jsonRes.get("result",None), "ok")
        self.assertEqual(bodyObject.get("id",None), 1)
        self.assertEqual(bodyObject.get("state",None), "1")
        self.assertEqual(bodyObject.get("number_fds",None), "36")
        self.assertEqual(bodyObject.get("city_fds",None), "Pereira")
        self.assertEqual(bodyObject.get("active_city",None), "Pereira")
        self.assertEqual(bodyObject.get("name_parent_fds",None), "Echeverry")

        self.assertEqual(jsonArea.get("id",None), 1)
        self.assertEqual(jsonArea.get("name",None), "Pre")

        self.assertEqual(jsonYoung.get("id",None), 1)
        self.assertEqual(jsonYoung.get("date_born",None), self.young.date_born)
        self.assertEqual(jsonYoung.get("home_phone",None), self.young.home_phone)
        self.assertEqual(jsonYoung.get("mobile_phone",None), self.young.mobile_phone)
        self.assertEqual(jsonYoung.get("address",None), self.young.address)
        self.assertEqual(jsonYoung.get("occupation",None), self.young.occupation)
        self.assertEqual(jsonYoung.get("profession",None), self.young.profession)

        self.assertEqual(jsonUser.get("id",None), 1)
        self.assertEqual(jsonUser.get("first_name",None), self.young.user.first_name)
        self.assertEqual(jsonUser.get("last_name",None), "Rodriguez")
        self.assertEqual(jsonUser.get("email",None), "andres.rodriguez0215@gmail.com")
        self.assertEqual(jsonUser.get("is_active",None), True)
        """
            {
                "status":200,
                "bodyObject":{
                    "id":1,
                    "young":{
                        "id":1,
                        "user":{
                            "id":1,
                            "first_name":"Andrés",
                            "last_name":"Rodriguez",
                            "email":"andres.rodriguez0215@gmail.com",
                            "is_active":True,
                            "last_login":self.young.user.last_login,
                            "date_joined":self.young.user.date_joined
                        },
                        "date_born":self.young.date_born,
                        "home_phone":self.young.home_phone,
                        "mobile_phone":self.young.mobile_phone,
                        "address":self.young.address,
                        "occupation":self.young.occupation,
                        "profession":self.young.profession,
                        "gender": "true"
                    },
                    "state": "1",
                    "number_fds": "36",
                    "city_fds": "Pereira",
                    "active_city": "Pereira",
                    "name_parent_fds": "Echeverry"
                },
                "result": "ok"
            }
        """
