# -*- coding: utf-8 -*-
from django.contrib.auth.models import User
from rest_framework import serializers
from main.models import (Young, Found, Inscription, Parents, Brothers,FdsEvents)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'is_active', 'last_login', 'date_joined')

class YoungSerializer(serializers.HyperlinkedModelSerializer):
    user = UserSerializer(many=False, read_only=False)
    class Meta:
        model = Young
        fields = ('id', 'user', 'date_born', 'home_phone', 'mobile_phone', 'address', 'occupation', 'profession', 'gender')
class FoundSerializer(serializers.HyperlinkedModelSerializer):
    young = YoungSerializer(many=False, read_only=False)
    class Meta:
        model = Found
        fields = ('id', 'young', 'state', 'number_fds', 'city_fds', 'active_city', 'name_parent_fds')
class fdsEventSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FdsEvents
        fields = ('id', 'name', 'number_fds', 'date_start', 'date_end', 'city_fds', 'is_form_active', 'is_active')
class InscriptionSerializerAll(serializers.HyperlinkedModelSerializer):
    young = YoungSerializer(many=False, read_only=False)
    class Meta:
        model = Inscription
        fields = '__all__'
class InscriptionSerializer(serializers.HyperlinkedModelSerializer):
    young = YoungSerializer(many=False, read_only=False)
    pieces_save = serializers.SerializerMethodField()

    def get_pieces_save(self, obj):
        return obj.get_pieces_save_display()
    
    class Meta:
        model = Inscription
        fields = ('id', 'young', 'inscription_date', 'who_intive_me', 'pieces_save')
class ParentsSerializer(serializers.HyperlinkedModelSerializer):
    young = YoungSerializer(many=False, read_only=False)
    class Meta:
        model = Parents
        fields = '__all__'
class BrothersSerializer(serializers.HyperlinkedModelSerializer):
    young = YoungSerializer(many=False, read_only=False)
    class Meta:
        model = Brothers
        fields = '__all__'