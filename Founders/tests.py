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
            'state': '1',
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
        print "__TEST__ (New Found With Young): ", jsonRes
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
        self.assertEqual(int(bodyObject.get("state",None)) <= 2, True)
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
    
    def test_youngEmpty(self):
        url = reverse("api:new_found_young")
        data = {
            'idyoung': 2,
            'state': '1',
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
        print "___TEST___ (Young None): ", jsonRes
        bodyObject =jsonRes.get("bodyObject",None)
        status =jsonRes.get("status",None)
        result =jsonRes.get("result",None)
        statusText =jsonRes.get("statusText",None)
        self.assertEqual(len(bodyObject)==0, True)
        self.assertEqual(status==200, True)
        self.assertEqual(result, "error")
        self.assertEqual(statusText, "Los datos que seleccionaste, no parecen estar dentro de nuestros registros.")

class NewFoundEmptyTest(APITestCase):
    def setUp(self):
        area = Areas.objects.create(name="Pre")
        Group.objects.create(name="Manizales")

        user=User.objects.create(first_name="Andres", last_name="Rodriguez", email="andres.rodriguez0215@gmail.com")
        young = Young.objects.create(
                        user=user, 
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
                        state="1", 
                        number_fds="36", 
                        city_fds="Pereira",
                        active_city="Manizales",
                        area=area,
                        name_parent_fds="Echeverry"
                )
    
    
    def test_newFoundEmptyExist(self):
        url = reverse("api:new_found_empty")
        data = {
            'personal_names':'Andres',
            'personal_lastnames': 'Rodriguez',
            'personal_email': 'andres.rodriguez0215@gmail.com',
            'personal_gender': '1',
            'personal_dateborn': '1994-05-24',
            'personal_homephone': '3393487',
            'personal_mobilephone': '3044643222',
            'personal_address': 'Manzana 15 casa 138 Villa campestre, Dosquebradas',
            'personal_occupation': 'Desarrollador',
            'personal_profession': 'Ingeniero de sistemas',
            'state': '1',
            'number_fds': '36',
            'city_fds': 'Pereira',
            'active_city': 'Manizales',
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
        print "___TEST___ (New found Exist): ", jsonRes
        status =jsonRes.get("status",None)
        bodyObject =jsonRes.get("bodyObject",None)
        result =jsonRes.get("result",None)
        statusText =jsonRes.get("statusText",None)

        self.assertEqual(status==200, True)
        self.assertEqual(len(bodyObject)==0, True)
        self.assertEqual(result, "error")
        self.assertEqual(statusText, "Hola Andres ya existes como usuario dentro del sistema tu registro esta con el correo: andres.rodriguez0215@gmail.com")
    
    def test_newFoundEmpty(self):
        url = reverse("api:new_found_empty")
        data = {
            'personal_names':'Sofia',
            'personal_lastnames': 'Cardona',
            'personal_email': 'so.ca@gmail.com',
            'personal_gender': '2',
            'personal_dateborn': '1994-05-24',
            'personal_homephone': '3393487',
            'personal_mobilephone': '3044643222',
            'personal_address': 'Manzana 15 casa 138 Villa campestre, Dosquebradas',
            'personal_occupation': 'Gerente Hospital',
            'personal_profession': 'Medico',
            'state': '1',
            'number_fds': '36',
            'city_fds': 'Pereira',
            'active_city': 'Manizales',
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
        print "___TEST___ (New found Empty): ", jsonRes
        status =jsonRes.get("status",None)
        bodyObject =jsonRes.get("bodyObject",None)
        jsonYoung = bodyObject.get("young", None)
        jsonArea = bodyObject.get("area", None)
        jsonUser = jsonYoung.get("user", None)

        self.assertEqual(status==200, True)
        self.assertEqual(bodyObject.get("id",None), 2)
        self.assertEqual(int(bodyObject.get("state",None)) <= 2, True)
        self.assertEqual(bodyObject.get("number_fds",None), "36")
        self.assertEqual(bodyObject.get("city_fds",None), "Pereira")
        self.assertEqual(bodyObject.get("active_city",None), "Manizales")
        self.assertEqual(bodyObject.get("name_parent_fds",None), "Echeverry")

        self.assertEqual(jsonArea.get("id",None), 1)
        self.assertEqual(jsonArea.get("name",None), "Pre")

        self.assertEqual(jsonYoung.get("id",None), 2)
        self.assertEqual(jsonYoung.get("date_born",None), "1994-05-24")
        self.assertEqual(jsonYoung.get("home_phone",None), "3393487")
        self.assertEqual(jsonYoung.get("mobile_phone",None), "3044643222")
        self.assertEqual(jsonYoung.get("address",None), "Manzana 15 casa 138 Villa campestre, Dosquebradas")
        self.assertEqual(jsonYoung.get("occupation",None), "Gerente Hospital")
        self.assertEqual(jsonYoung.get("profession",None), "Medico")

        self.assertEqual(jsonUser.get("id",None), 2)
        self.assertEqual(jsonUser.get("first_name",None), "Sofia")
        self.assertEqual(jsonUser.get("last_name",None), "Cardona")
        self.assertEqual(jsonUser.get("email",None), "so.ca@gmail.com")
        self.assertEqual(jsonUser.get("is_active",None), True)
    
    def test_newFoundEmptyFieldsRequired(self):
        url = reverse("api:new_found_empty")
        data = {
            'personal_names':'',
            'personal_lastnames': '',
            'personal_email': '',
            'personal_gender': '2',
            'personal_dateborn': '1994-05-24',
            'personal_homephone': '3393487',
            'personal_mobilephone': '3044643222',
            'personal_address': 'Manzana 15 casa 138 Villa campestre, Dosquebradas',
            'personal_occupation': 'Gerente Hospital',
            'personal_profession': 'Medico',
            'state': '1',
            'number_fds': '36',
            'city_fds': 'Pereira',
            'active_city': '',
            'area': '1',
            'name_parent_fds': 'Echeverry',
            'password':'',
        }
        response = self.client.post(url, data, format='json')
        response_content = response.content
        if six.PY3:
            response_content = str(response_content, encoding='utf8')
        
        """ Parser JSON"""
        jsonRes = json.loads(response_content)
        print "___TEST___ (New found Fields Required): ", jsonRes
        status =jsonRes.get("status",None)
        bodyObject =jsonRes.get("bodyObject",None)
        result =jsonRes.get("result",None)
        statusText =jsonRes.get("statusText",None)

        self.assertEqual(status==200, True)
        self.assertEqual(len(bodyObject)==0, True)
        self.assertEqual(result, "error")
        self.assertEqual(statusText, "Lo sentimos!! algunos datos son obligatorios.")
    
    def test_getSingleFound(self):
        url = reverse("api:new_found_empty")
        args = {'id':'1'}
        response = self.client.get(url, args, format='json')
        jsonRes = response.data
        print "___TEST___ (GET SINGLE FOUND): ", jsonRes
        status =jsonRes.get("status",None)
        bodyObject =jsonRes.get("bodyObject",None)
        jsonYoung = bodyObject.get("young", None)
        jsonUser = jsonYoung.get("user", None)
        jsonArea = bodyObject.get("area", None)

        self.assertEqual(status==200, True)
        self.assertEqual(bodyObject.get("id",None), 1)
        self.assertEqual(int(bodyObject.get("state",None)) <= 2, True)
        self.assertEqual(bodyObject.get("number_fds",None), "36")
        self.assertEqual(bodyObject.get("city_fds",None), "Pereira")
        self.assertEqual(bodyObject.get("active_city",None), "Manizales")
        self.assertEqual(bodyObject.get("name_parent_fds",None), "Echeverry")

        self.assertEqual(jsonArea.get("id",None), 1)
        self.assertEqual(jsonArea.get("name",None), "Pre")

        self.assertEqual(jsonYoung.get("id",None), 1)
        self.assertEqual(jsonYoung.get("date_born",None), "1994-05-24")
        self.assertEqual(jsonYoung.get("home_phone",None), "3428744")
        self.assertEqual(jsonYoung.get("mobile_phone",None), "3044643222")
        self.assertEqual(jsonYoung.get("address",None), "Manzana 15 casa 138 Villa campestre, Dosquebradas")
        self.assertEqual(jsonYoung.get("occupation",None), "Desarrollador")
        self.assertEqual(jsonYoung.get("profession",None), "Ingeniero de sistemas")

        self.assertEqual(jsonUser.get("id",None), 1)
        self.assertEqual(jsonUser.get("first_name",None), "Andres")
        self.assertEqual(jsonUser.get("last_name",None), "Rodriguez")
        self.assertEqual(jsonUser.get("email",None), "andres.rodriguez0215@gmail.com")
        self.assertEqual(jsonUser.get("is_active",None), True)
    
    def test_getSingleFoundIdNone(self):
        url = reverse("api:new_found_empty")
        args = {'id':''}
        response = self.client.get(url, args, format='json')
        jsonRes = response.data
        print "___TEST___ (GET SINGLE FOUND ERROR ID): ", jsonRes
        status =jsonRes.get("status",None)
        bodyObject =jsonRes.get("bodyObject",None)
        result =jsonRes.get("result",None)
        statusText =jsonRes.get("statusText",None)

        self.assertEqual(status==200, True)
        self.assertEqual(len(bodyObject)==0, True)
        self.assertEqual(result, "error")
        self.assertEqual(statusText, "Lo sentimos!! Ocurrio un error validando el identificador del encontrado.")
    
    def test_getSingleFoundIdNone(self):
        url = reverse("api:new_found_empty")
        args = {'id':'0'}
        response = self.client.get(url, args, format='json')
        jsonRes = response.data
        print "___TEST___ (GET SINGLE FOUND ERROR ID): ", jsonRes
        status =jsonRes.get("status",None)
        bodyObject =jsonRes.get("bodyObject",None)
        result =jsonRes.get("result",None)
        statusText =jsonRes.get("statusText",None)

        self.assertEqual(status==200, True)
        self.assertEqual(len(bodyObject)==0, True)
        self.assertEqual(result, "error")
        self.assertEqual(statusText, "Lo sentimos!! No encontramos ningun dato en la busqueda.")