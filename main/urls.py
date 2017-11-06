from django.conf.urls import url, include
from. import views

urlpatterns=[
    #url(r'^$', views.show_home, name="home"),
    url(r'^inscripciones/', views.inscriptions_add, name='inscriptions_add'),
    url(r'^fds/', views.list_fds, name='list_fds'),
    url(r'^formenable/', views.enable_inscriptions, name='form_enable'),
    url(r'^', include('login.urls', namespace='login')),
]