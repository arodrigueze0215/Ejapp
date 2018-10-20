from django.conf.urls import url
from login import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    url(r'^login/$', views.loginUser, name='loginUser'),
    url(r'^logout/$', auth_views.LogoutView,{'next_page':'/login/'}, name='logout'),
]