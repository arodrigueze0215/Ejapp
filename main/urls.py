from django.conf.urls import url
from. import views

urlpatterns=[
    #url(r'^$', views.show_home, name="home"),
    url(r'^inscripciones/', views.inscriptions_add, name='inscriptions_add'),
    url(r'^fds/', views.list_fds, name='list_fds'),
]