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

    def test_updateInscription(self):
        factory = APIRequestFactory()
        view = InscriptionDetails.as_view()
        data = {
            'personal_names': 'Consuelo',
            'personal_lastnames': 'Rodriguez',
            'personal_email': 'concha@gmail.com',
            'personal_dateborn': '1994-05-24',
            'personal_homephone':'3428744', 
            'personal_mobilephone':'3044643222',
            'personal_address':'Manzana 15 casa 138 Villa campestre, Dosquebradas',
            'personal_occupation':'Desarrollador',
            'personal_profession':'Ingeniero de sistemas',
            'personal_gender':'2',
            'do_you_study': True,
            'carrer': 'Ingenieria de Sistemas',
            'school': 'UCP',
            'do_you_work': False,
            'company': 'Veritran',
            'position_job': 'Dev web',
            'phone_company': '3112233',
            'life_with_gran': False,
            'life_with_parent': False,
            'life_with_only_mother': True,
            'life_with_only_father': False,
            'life_with_uncles': False,
            'life_with_friends': False,
            'life_with_cousins': False,
            'life_with_brothers': False,
            'life_with_alone': False,
            'illness': 'Ninguna hasta ahora',
            'especial_food': 'Vegetariana',
            'special_medicine': 'Ninguna',
            'eps': 'Sura',
            'who_invite_me': 'Katherine G',
            'who_invite_me_number': '3112233445',
            'do_you_want_ej': True,
            'why_fds': 'Me genera Intriga',
            'other_experiences': True,
            'experiences_which': 'EPJ',
            'pieces_save': '1',
            'person_mostimportant_name': 'Teresa Velez',
            'person_mostimportant_number': '3112233445'
        }
        url = "{0}?id={1};idyoung={2}".format(reverse("api:inscription_details") ,1 ,2)

        request = factory.put(url, data)
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

        self.assertEqual(userObj.get("first_name", None), "Consuelo")
        self.assertEqual(userObj.get("last_name", None), "Rodriguez")
        self.assertEqual(userObj.get("email", None), "concha@gmail.com")

        self.assertEqual(youngObj.get("date_born", None), "1994-05-24")
        self.assertEqual(youngObj.get("home_phone", None), "3428744")
        self.assertEqual(youngObj.get("mobile_phone", None), "3044643222")
        self.assertEqual(youngObj.get("address", None), "Manzana 15 casa 138 Villa campestre, Dosquebradas")
        self.assertEqual(youngObj.get("occupation", None), "Desarrollador")
        self.assertEqual(youngObj.get("profession", None), "Ingeniero de sistemas")
        self.assertEqual(youngObj.get("gender", None), "FEMENINO")


        self.assertEqual(bodyObject.get("do_you_study", None), True)
        self.assertEqual(bodyObject.get("carrer", None), "Ingenieria de Sistemas")
        self.assertEqual(bodyObject.get("school", None), "UCP")
        self.assertEqual(bodyObject.get("do_you_work", None), False)
        self.assertEqual(bodyObject.get("company", None), "Veritran")
        self.assertEqual(bodyObject.get("position_job", None), "Dev web")
        self.assertEqual(bodyObject.get("phone_company", None), "3112233")
        self.assertEqual(bodyObject.get("life_with_gran", None), False)
        self.assertEqual(bodyObject.get("life_with_parent", None), False)
        self.assertEqual(bodyObject.get("life_with_only_mother", None), True)
        self.assertEqual(bodyObject.get("life_with_only_father", None), False)
        self.assertEqual(bodyObject.get("life_with_uncles", None), False)
        self.assertEqual(bodyObject.get("life_with_friends", None), False)
        self.assertEqual(bodyObject.get("life_with_cousins", None), False)
        self.assertEqual(bodyObject.get("life_with_brothers", None), False)
        self.assertEqual(bodyObject.get("life_with_alone", None), False)
        self.assertEqual(bodyObject.get("illness", None), "Ninguna hasta ahora")
        self.assertEqual(bodyObject.get("especial_food", None), "Vegetariana")
        self.assertEqual(bodyObject.get("special_medicine", None), "Ninguna")
        self.assertEqual(bodyObject.get("eps", None), "Sura")
        self.assertEqual(bodyObject.get("who_invite_me", None), "Katherine G")
        self.assertEqual(bodyObject.get("who_invite_me_number", None), "3112233445")
        self.assertEqual(bodyObject.get("do_you_want_ej", None), True)
        self.assertEqual(bodyObject.get("why_fds", None), "Me genera Intriga")
        self.assertEqual(bodyObject.get("other_experiences", None), True)
        self.assertEqual(bodyObject.get("experiences_which", None), "EPJ")
        self.assertEqual(bodyObject.get("pieces_save", None), "DEBE")
        self.assertEqual(bodyObject.get("person_mostimportant_name", None), "Teresa Velez")
        self.assertEqual(bodyObject.get("person_mostimportant_number", None), "3112233445")
        print "test_updateInscription (UPDATE INSCRIPTION): [OK]"




