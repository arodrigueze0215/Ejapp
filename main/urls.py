from django.conf.urls import url
from. import views

urlpatterns=[
    #url(r'^$', views.show_home, name="home"),
    url(r'^$', views.inscriptions_add, name='inscriptions_add'),
]