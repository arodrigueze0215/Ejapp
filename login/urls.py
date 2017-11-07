from django.conf.urls import url
import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    url(r'^login/$', views.loginUser, name='loginUser'),
    url(r'^logout/$', auth_views.logout,{'next_page':'/login/'}, name='logout'),
]