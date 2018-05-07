# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.conf.urls import include
from django.urls import reverse
from django.utils import six
import json
from rest_framework.test import (
    APITestCase,
    APIRequestFactory,
    force_authenticate
)
from django.contrib.auth.models import User
from django.contrib.auth.models import Group
from api.views import (
    FoundList,
    Found as apiFound
)
from main.models import (
    Young, 
    Found, 
    Areas
)

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
        print "test_newFoundWithYoung (New Found With Young): [OK]"
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
        bodyObject =jsonRes.get("bodyObject",None)
        status =jsonRes.get("status",None)
        result =jsonRes.get("result",None)
        statusText =jsonRes.get("statusText",None)
        self.assertEqual(len(bodyObject)==0, True)
        self.assertEqual(status==200, True)
        self.assertEqual(result, "error")
        self.assertEqual(statusText, "Los datos que seleccionaste, no parecen estar dentro de nuestros registros.")
        print "test_youngEmpty (Young None): [OK]"

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
        status =jsonRes.get("status",None)
        bodyObject =jsonRes.get("bodyObject",None)
        result =jsonRes.get("result",None)
        statusText =jsonRes.get("statusText",None)

        self.assertEqual(status==200, True)
        self.assertEqual(len(bodyObject)==0, True)
        self.assertEqual(result, "error")
        self.assertEqual(statusText, "Hola Andres ya existes como usuario dentro del sistema tu registro esta con el correo: andres.rodriguez0215@gmail.com")
        print "test_newFoundEmptyExist (New found Exist): [OK]"
    
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
        print "test_newFoundEmpty (New found Empty): [OK]"
    
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
        status =jsonRes.get("status",None)
        bodyObject =jsonRes.get("bodyObject",None)
        result =jsonRes.get("result",None)
        statusText =jsonRes.get("statusText",None)

        self.assertEqual(status==200, True)
        self.assertEqual(len(bodyObject)==0, True)
        self.assertEqual(result, "error")
        self.assertEqual(statusText, "Lo sentimos!! algunos datos son obligatorios.")
        print "test_newFoundEmptyFieldsRequired (New found Fields Required): [OK]"
    
    def test_getSingleFound(self):
        url = reverse("api:new_found_empty")
        args = {'id':'1'}
        response = self.client.get(url, args, format='json')
        jsonRes = response.data
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
        print "test_getSingleFound (GET SINGLE FOUND): [OK]"
    
    def test_getSingleFoundIdNone(self):
        url = reverse("api:new_found_empty")
        args = {'id':''}
        response = self.client.get(url, args, format='json')
        jsonRes = response.data
        status =jsonRes.get("status",None)
        bodyObject =jsonRes.get("bodyObject",None)
        result =jsonRes.get("result",None)
        statusText =jsonRes.get("statusText",None)

        self.assertEqual(status==200, True)
        self.assertEqual(len(bodyObject)==0, True)
        self.assertEqual(result, "error")
        self.assertEqual(statusText, "Lo sentimos!! Ocurrio un error validando el identificador del encontrado.")
        print "test_getSingleFoundIdNone (GET SINGLE FOUND ERROR ID): OK"
    
    def test_getSingleFoundIdNone(self):
        url = reverse("api:new_found_empty")
        args = {'id':'0'}
        response = self.client.get(url, args, format='json')
        jsonRes = response.data
        status =jsonRes.get("status",None)
        bodyObject =jsonRes.get("bodyObject",None)
        result =jsonRes.get("result",None)
        statusText =jsonRes.get("statusText",None)

        self.assertEqual(status==200, True)
        self.assertEqual(len(bodyObject)==0, True)
        self.assertEqual(result, "error")
        self.assertEqual(statusText, "Lo sentimos!! No encontramos ningun dato en la busqueda.")
        print "test_getSingleFoundIdNone (GET SINGLE FOUND ERROR ID): [OK]" 

class ListFoundsTest(APITestCase):
    user = None
    found = None
    def setUp(self):
        area = Areas.objects.create(name="Pre")
        Group.objects.create(name="Pereira")
        user2 = User.objects.create(username="rafa@gmail.com", email="rafa@gmail.com",first_name="Rafael", last_name="Rodriguez", password="test_ejapp1")
        user1 = User.objects.create(username="tere.sa@gmail.com",email="tere.sa@gmail.com",first_name="Teresa", last_name="Agudelo", password="test_ejapp2")
        self.user = User.objects.create(username="andres.rodriguez0215@gmail.com", email="andres.rodriguez0215@gmail.com")
        self.user.first_name="Andres" 
        self.user.last_name="Rodriguez"
        self.user.set_password("test_ejapp")
        self.user.save()
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
        self.found = Found.objects.create(
            young=young, 
            state="1", 
            number_fds="36", 
            city_fds="Pereira",
            active_city="Pereira",
            area=area,
            name_parent_fds="Echeverry"
        )
    
        young1 = Young.objects.create(
            user=user1, 
            date_born="1994-05-24", 
            home_phone="3428744", 
            mobile_phone="3044643222",
            address="Manzana 15 casa 138 Villa campestre, Dosquebradas",
            occupation="Desarrollador",
            profession="Ingeniera de sistemas",
            gender="2"
        )
        Found.objects.create(
            young=young1, 
            state="1", 
            number_fds="36", 
            city_fds="Pereira",
            active_city="Pereira",
            area=area,
            name_parent_fds="Torres"
        )
    
        young2 = Young.objects.create(
            user=user2, 
            date_born="1994-05-24", 
            home_phone="3428744", 
            mobile_phone="3044643222",
            address="Manzana 15 casa 138 Villa campestre, Dosquebradas",
            occupation="Desarrollador",
            profession="Ingeniero de sistemas",
            gender="1"
        )
        Found.objects.create(
            young=young2, 
            state="1", 
            number_fds="36", 
            city_fds="Pereira",
            active_city="Pereira",
            area=area,
            name_parent_fds="Andres"
        )
    
        
    def test_getListFounds(self):
        factory = APIRequestFactory()
        view = FoundList.as_view()

        request = factory.get(reverse("api:list_founds"))
        request.user = self.user
        force_authenticate(request, user=self.user)
        
        response = view(request)
        jsonRes = response.data
        status =jsonRes.get("status",None)
        bodyObject =jsonRes.get("bodyObject",None)
        result =jsonRes.get("result",None)
        self.assertEqual(result, "ok")
        print "test_getListFounds (GET LIST FOUND): [OK]"
    
    def test_getListFoundsEmptyGroup(self):
        self.found.active_city = "Armenia"
        self.found.save()
        factory = APIRequestFactory()
        view = FoundList.as_view()

        request = factory.get(reverse("api:list_founds"))
        request.user = self.found.young.user
        force_authenticate(request, user=self.found.young.user)
        
        response = view(request)
        jsonRes = response.data
        status =jsonRes.get("status",None)
        bodyObject =jsonRes.get("bodyObject",None)
        result =jsonRes.get("result",None)
        statusText =jsonRes.get("statusText",None)
        self.assertEqual(status, 200)
        self.assertEqual(len(bodyObject)==0, True)
        self.assertEqual(statusText, "Lo sentimos!! Ocurrio un error validando la ciudad en la que estas activa.")
        self.assertEqual(result, "error")
        print "test_getListFoundsEmptyGroup (GET LIST FOUND, EMPTY GROUP): [OK]"

class UpdateFoundTest(APITestCase):
    def setUp(self):
        area = Areas.objects.create(name="Pre")
        self.user = User.objects.create(username="arodrigueze", email="andres.rodriguez0215@gmail.com")
        self.user.first_name="Andres" 
        self.user.last_name="Rodriguez"
        self.user.set_password("test_ejapp")
        self.user.save()
        user1 = User.objects.create(username="arod", email="andres.ro@gmail.com")
        user1.first_name="Andres" 
        user1.last_name="Rodriguez"
        user1.set_password("test_ejapp")
        user1.save()
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
        found = Found.objects.create(
            young=young,  
            number_fds="36", 
            city_fds="Pereira",
            active_city="Pereira",
            area=area,
            name_parent_fds="Echeverry"
        )
    def test_updateDataFound(self):
        factory = APIRequestFactory()
        view = apiFound.as_view()
        data = {
            'personal_names':'Andres R',
            'personal_lastnames': 'Rodriguez Escudero',
            'personal_email': 'andres.r@gmail.com',
            'personal_gender': '1',
            'personal_dateborn': '1989-02-15',
            'personal_homephone': '3393487',
            'personal_mobilephone': '3044643221',
            'personal_address': 'Manzana 03 casa 03 Quintas de Aragon, Dosquebradas',
            'personal_occupation': 'Dev web',
            'personal_profession': 'Ingeniero de sistemas',
            'number_fds': '42',
            'city_fds': 'Pereira',
            'name_parent_fds': 'Familia Echeverry',
            'personal_username': 'Are0215',
        }
        request = factory.put(reverse("api:new_found_empty"), data)
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
        self.assertEqual(userObj.get("username", None) != "arodrigueze", True)
        self.assertEqual(userObj.get("username", None) == "Are0215", True)
        self.assertEqual(userObj.get("first_name", None) != "Andres", True)
        self.assertEqual(userObj.get("first_name", None) == "Andres R", True)
        self.assertEqual(userObj.get("last_name", None) != "Rodriguez", True)
        self.assertEqual(userObj.get("last_name", None) == "Rodriguez Escudero", True)
        self.assertEqual(userObj.get("email", None) != "andres.rodriguez0215@gmail.com", True)
        self.assertEqual(userObj.get("email", None) == "andres.r@gmail.com", True)

        self.assertEqual(youngObj.get("date_born", None) != "1994-05-24", True)
        self.assertEqual(youngObj.get("date_born", None) == "1989-02-15", True)
        self.assertEqual(youngObj.get("home_phone", None) != "3428744", True)
        self.assertEqual(youngObj.get("home_phone", None) == "3393487", True)
        self.assertEqual(youngObj.get("mobile_phone", None) != "3044643222", True)
        self.assertEqual(youngObj.get("mobile_phone", None) == "3044643221", True)
        self.assertEqual(youngObj.get("address", None) != "Manzana 15 casa 138 Villa campestre, Dosquebradas", True)
        self.assertEqual(youngObj.get("address", None) == "Manzana 03 casa 03 Quintas de Aragon, Dosquebradas", True)
        self.assertEqual(youngObj.get("occupation", None) != "Desarrollador", True)
        self.assertEqual(youngObj.get("occupation", None) == "Dev web", True)
        self.assertEqual(bodyObject.get("number_fds", None), "42")
        self.assertEqual(bodyObject.get("city_fds", None), "Pereira")
        self.assertEqual(bodyObject.get("name_parent_fds", None), "Familia Echeverry")
        print "test_updateDataFound (UPDATE FOUND): [OK]"

    def test_userMailRequest(self):
        factory = APIRequestFactory()
        view = apiFound.as_view()
        data = {
            'personal_names':'Andres R',
            'personal_lastnames': 'Rodriguez Escudero',
            'personal_email': 'andres.ro@gmail.com',
            'personal_gender': '1',
            'personal_dateborn': '1989-02-15',
            'personal_homephone': '3393487',
            'personal_mobilephone': '3044643221',
            'personal_address': 'Manzana 03 casa 03 Quintas de Aragon, Dosquebradas',
            'personal_occupation': 'Dev web',
            'personal_profession': 'Ingeniero de sistemas',
            'number_fds': '42',
            'city_fds': 'Pereira',
            'name_parent_fds': 'Familia Echeverry',
            'personal_username': 'Are0215',
        }
        request = factory.put(reverse("api:new_found_empty"), data)
        request.user = self.user
        force_authenticate(request, user=self.user)
        response = view(request)
        jsonRes = response.data
        status =jsonRes.get("status",None)
        statusText =jsonRes.get("statusText",None)
        result =jsonRes.get("result",None)
        self.assertEqual(status, 200)
        self.assertEqual(result, "error")
        self.assertEqual(statusText, "Ya existe un usuario con este correo")
        print "test_userMailRequest (UPDATE FOUND, USER DOES EXIST): [OK]"

    def test_userNameRequest(self):
        factory = APIRequestFactory()
        view = apiFound.as_view()
        data = {
            'personal_names':'Andres R',
            'personal_lastnames': 'Rodriguez Escudero',
            'personal_email': 'andres.r@gmail.com',
            'personal_gender': '1',
            'personal_dateborn': '1989-02-15',
            'personal_homephone': '3393487',
            'personal_mobilephone': '3044643221',
            'personal_address': 'Manzana 03 casa 03 Quintas de Aragon, Dosquebradas',
            'personal_occupation': 'Dev web',
            'personal_profession': 'Ingeniero de sistemas',
            'number_fds': '42',
            'city_fds': 'Pereira',
            'name_parent_fds': 'Familia Echeverry',
            'personal_username': 'arod',
        }
        request = factory.put(reverse("api:new_found_empty"), data)
        request.user = self.user
        force_authenticate(request, user=self.user)
        response = view(request)
        jsonRes = response.data
        status =jsonRes.get("status",None)
        statusText =jsonRes.get("statusText",None)
        result =jsonRes.get("result",None)
        self.assertEqual(status, 200)
        self.assertEqual(result, "error")
        self.assertEqual(statusText, "Ya existe un usuario con este username")
        print "test_userNameRequest (UPDATE FOUND, USER DOES EXIST): [OK]"

class DeletFoundTest(APITestCase):
    def setUp(self):
        area = Areas.objects.create(name="Pre")
        self.user = User.objects.create(username="arodrigueze", email="andres.rodriguez0215@gmail.com")
        self.user.first_name="Andres" 
        self.user.last_name="Rodriguez"
        self.user.set_password("test_ejapp")
        self.user.save()
        user1 = User.objects.create(username="daniCasta", email="dani.casta@gmail.com")
        user1.first_name="Daniela" 
        user1.last_name="Rodriguez"
        user1.set_password("test_ejapp")
        user1.save()
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
        young1 = Young.objects.create(
            user=user1, 
            date_born="1994-05-24", 
            home_phone="3428744", 
            mobile_phone="3044643222",
            address="Manzana 15 casa 138 Villa campestre, Dosquebradas",
            occupation="Desarrollador",
            profession="Ingeniero de sistemas",
            gender="1"
        )
        Found.objects.create(
            young=young1,  
            number_fds="36", 
            city_fds="Pereira",
            active_city="Pereira",
            area=area,
            name_parent_fds="Echeverry"
        )
    def test_deleteFound(self):
        factory = APIRequestFactory()
        view = apiFound.as_view()
        params = {'id':'1'}
        request = factory.delete(reverse("api:new_found_empty"), params)        
        request.user = self.user
        force_authenticate(request, user=self.user)
        response = view(request)
        jsonRes = response.data
        status =jsonRes.get("status",None)
        statusText =jsonRes.get("statusText",None)
        result =jsonRes.get("result",None)
        self.assertEqual(status, 200)
        self.assertEqual(result, "ok")
        self.assertEqual(statusText, "Hola Andres. Tu perfil ha sido inhabilitado, Nos entristese que lo hayas decidido asi. Si deseas habilitar tu cuenta de nuevo, ponte en contanto con el consejo de tu ciudad.")
        print "test_deleteFound (DISABLE FOUNDER): [OK]"
    
    def test_deleteFoundObjectDoesNotExist(self):
        factory = APIRequestFactory()
        view = apiFound.as_view()
        params = {'id':'3'}
        request = factory.delete(reverse("api:new_found_empty"), params)        
        request.user = self.user
        force_authenticate(request, user=self.user)
        response = view(request)
        jsonRes = response.data
        status =jsonRes.get("status",None)
        statusText =jsonRes.get("statusText",None)
        result =jsonRes.get("result",None)
        self.assertEqual(status, 200)
        self.assertEqual(result, "error")
        self.assertEqual(statusText, "Lo sentimos!! Ocurrio un error validando el usuario a eliminar.")
        print "test_deleteFoundObjectDoesNotExist (DISABLE FOUNDER, OBJECT DOES EXIST): [OK]"
    
    def test_deleteFoundIdNotFound(self):
        factory = APIRequestFactory()
        view = apiFound.as_view()
        params = {'id':'2'}
        request = factory.delete(reverse("api:new_found_empty"), params)        
        request.user = self.user
        force_authenticate(request, user=self.user)
        response = view(request)
        jsonRes = response.data
        status =jsonRes.get("status",None)
        statusText =jsonRes.get("statusText",None)
        result =jsonRes.get("result",None)
        self.assertEqual(status, 200)
        self.assertEqual(result, "error")
        self.assertEqual(statusText, "Lo sentimos!! No tienes permisos para realizar esta accion.")
        print "test_deleteFoundIdNotFound (DISABLE FOUNDER, FOUNDER DOES EXIST): [OK]"
