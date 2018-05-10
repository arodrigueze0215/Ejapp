from django.conf.urls import url
from .views import (InscriptionsList, 
                    InscriptionDetails,
                    ParentsList, 
                    BrothersList, 
                    UserAuth, 
                    YoungList, 
                    NewFoundWithYoung,
                    Found,
                    FoundList,
                    AreasList,
                    CitiesList
                )

urlpatterns = [
    url(r'^inscriptions/$', InscriptionsList.as_view()),
    url(r'^apiauth/$', UserAuth.as_view()),
    url(r'^inscriptions/details/$', InscriptionDetails.as_view()),
    url(r'^parentlist/$', ParentsList.as_view(),name='parents_list'),
    url(r'^brotherslist/$', BrothersList.as_view(),name='brothers_list'),
    url(r'^younglist/filtered/$', YoungList.as_view(),name='young_list_filtered'),
    url(r'^newfound/$', NewFoundWithYoung.as_view(),name='new_found_young'),
    url(r'^founds/$', Found.as_view(),name='new_found_empty'),
    url(r'^founds/list/$', FoundList.as_view(),name='list_founds'),
    url(r'^areas/$', AreasList.as_view(),name='list_areas'),
    url(r'^cities/$', CitiesList.as_view(),name='list_cities')
]