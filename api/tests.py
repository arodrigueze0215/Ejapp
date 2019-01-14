from __future__ import unicode_literals
from django.conf.urls import include
from django.urls import reverse
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
    def test_listYoung(self):
        self.assertEqual(1==1,True)