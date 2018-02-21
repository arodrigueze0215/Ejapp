from django.conf.urls import url
from .views import (InscriptionsList, InscriptionDetails,
         ParentsList, BrothersList, UserAuth, YoungList)

urlpatterns = [
    url(r'^inscriptions/$', InscriptionsList.as_view()),
    url(r'^apiauth/$', UserAuth.as_view()),
    url(r'^inscriptions/details/$', InscriptionDetails.as_view()),
    url(r'^parentlist/$', ParentsList.as_view(),name='parents_list'),
    url(r'^brotherslist/$', BrothersList.as_view(),name='brothers_list'),
    url(r'^younglist/filtered/$', YoungList.as_view(),name='young_list_filtered'),
]