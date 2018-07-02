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
    Areas,
    Parents,
    Brothers
)
from api.views import (
    ParentsList,
    BrothersList
)

class ListParentsTest(APITestCase):
    def setUp(self):
        print "INIT --------------------------------------- [ListParentsTest] ---------------------------------------"
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
        user=User.objects.create(first_name="Consuelo", last_name="Rodriguez", email="concha@gmail.com")
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
        Parents.objects.create(
            young=young,
            relationship="1",
            name_parent="Doña Consuelo"
        )
        Parents.objects.create(
            young=young,
            relationship="2",
            name_parent="Don Jorge"
        )
         
    def test_getListParents(self):
        factory = APIRequestFactory()
        view = ParentsList.as_view()
        data = {
            'idyoung':2
        }
        request = factory.get(reverse("api:brothers_list"), data)
        request.user = self.user
        force_authenticate(request, user=self.user)
        response = view(request)
        jsonRes = response.data
        obj =jsonRes.get("object",None)
        status =jsonRes.get("status",None)
        result =jsonRes.get("result",None)
        bodyObject = obj.get("bodyObject",None)
        headerObject = obj.get("headerObject",None)
        userObj = headerObject.get("user",None)
        self.assertEqual(status, 200)
        self.assertEqual(result, "ok")
        self.assertEqual(len(bodyObject)>0, True)
        self.assertEqual(userObj.get("first_name", None), "Consuelo")
        self.assertEqual(userObj.get("last_name", None), "Rodriguez")
        self.assertEqual(userObj.get("email", None), "concha@gmail.com")
        self.assertEqual(headerObject.get("id", None), 2)
        self.assertEqual(headerObject.get("date_born", None), "1994-05-24")
        if len(bodyObject)>0:
            self.assertEqual(bodyObject[0].get("relationship", None), "Mamá")
            self.assertEqual(bodyObject[0].get("name_parent", None), "Doña Consuelo")
            self.assertEqual(bodyObject[1].get("relationship", None), "Papá")
            self.assertEqual(bodyObject[1].get("name_parent", None), "Don Jorge")
        print "test_getListParents (GET LIST PARENTS): [OK]"

class ListBrotherTest(APITestCase):
    def setUp(self):
        print "INIT --------------------------------------- [ListBrotherTest] ---------------------------------------"
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
        user=User.objects.create(first_name="Consuelo", last_name="Rodriguez", email="concha@gmail.com")
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
        Brothers.objects.create(
            young=young,
            relationship="1",
            name_brother="Toño",
            date_born="1990-05-24"
        )
        Brothers.objects.create(
            young=young,
            relationship="2",
            name_brother="Sofia",
            date_born="1991-05-24"
        )
    def test_getListBrothers(self):
        factory = APIRequestFactory()
        view = BrothersList.as_view()
        data = {
            'idyoung':2
        }
        request = factory.get(reverse("api:parents_list"), data)
        request.user = self.user
        force_authenticate(request, user=self.user)
        response = view(request)
        jsonRes = response.data
        obj =jsonRes.get("object",None)
        status =jsonRes.get("status",None)
        result =jsonRes.get("result",None)
        bodyObject = obj.get("bodyObject",None)
        headerObject = obj.get("headerObject",None)
        userObj = headerObject.get("user",None)
        self.assertEqual(status, 200)
        self.assertEqual(result, "ok")
        self.assertEqual(len(bodyObject)>0, True)
        self.assertEqual(userObj.get("first_name", None), "Consuelo")
        self.assertEqual(userObj.get("last_name", None), "Rodriguez")
        self.assertEqual(userObj.get("email", None), "concha@gmail.com")
        self.assertEqual(headerObject.get("id", None), 2)
        self.assertEqual(headerObject.get("date_born", None), "1994-05-24")
        if len(bodyObject)>0:
            self.assertEqual(bodyObject[0].get("relationship", None), "hermano")
            self.assertEqual(bodyObject[0].get("name_brother", None), "Toño")
            self.assertEqual(bodyObject[1].get("relationship", None), "hermana")
            self.assertEqual(bodyObject[1].get("name_brother", None), "Sofia")
        print "test_getListBrothers (GET LIST BROTHERS): [OK]"