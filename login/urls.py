from django.conf.urls import url
from login import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    url(r'^login/$', views.loginView, name='loginView'),
    url(r'^logout/$', auth_views.LogoutView.as_view(next_page="/login/"), name='logout')
]
