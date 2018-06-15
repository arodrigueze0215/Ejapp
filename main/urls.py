from django.conf.urls import url, include
from. import views

urlpatterns=[
    #url(r'^$', views.show_home, name="home"),
    url(r'^inscripciones/', views.inscriptions_add, name='inscriptions_add'),
    url(r'^inscritos/lista/', views.inscriptions_list),
    url(r'^inscrito/detalle/', views.inscription_detail),
    url(r'^fds/', views.list_fds, name='list_fds'),
    url(r'^formenable/', views.enable_inscriptions, name='form_enable'),
    url(r'^geturl/', views.get_url_inscription, name='get_url_inscription'),
    url(r'^resultado/', views.result_inscription, name='result_register'),
    url(r'^nuevo/', views.formNewEmptyFounder, name='form_new_empty_founder'),
    url(r'^', include('login.urls', namespace='login')),
]