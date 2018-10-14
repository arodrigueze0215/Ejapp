# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.test import TestCase
from Young.views import YoungController
from main.models import (
    Young,
)

class YoungTest(TestCase):
    def setUp(self):
        print "INIT --------------------------------------- [YoungTest] ---------------------------------------"
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
    def test_updateYoung(self):
        yController = YoungController()
        response = yController.update(
            personal_names= "Consuelito Mercedez",
            personal_lastnames= "Rodriguez Escudero",
            idyoung=1,
            personal_address="Manzana 1 casa 1"

        )
        status =response.get("status",None)
        result =response.get("result",None)
        bodyObject = response.get("bodyObject",None)
        userObj = bodyObject.get("user",None)
        self.assertEqual(status, 200)
        self.assertEqual(result, "ok")
        self.assertEqual(userObj.get("first_name", None), "Consuelito Mercedez")
        self.assertEqual(userObj.get("last_name", None), "Rodriguez Escudero")
        self.assertEqual(userObj.get("email", None), "concha@gmail.com")

