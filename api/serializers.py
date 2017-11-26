# -*- coding: utf-8 -*-
from django.contrib.auth.models import User
from rest_framework import serializers
from main.models import (Young, Found, Inscription, Parents, Brothers, FdsEvents)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'is_active', 'last_login', 'date_joined')

class YoungSerializer(serializers.HyperlinkedModelSerializer):
    user = UserSerializer(many=False, read_only=False)
    gender = serializers.SerializerMethodField()

    def get_gender(self, obj):
        return obj.get_gender_display()
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
    pieces_save = serializers.SerializerMethodField()

    def get_pieces_save(self, obj):
        return obj.get_pieces_save_display()
    
    class Meta:
        model = Inscription
        fields = ('id', 'young', 'inscription_date', 'do_you_study', 'carrer', 'school', 'do_you_work',
          'company', 'position_job','phone_company', 'life_with_gran','life_with_parent','life_with_only_mother',
          'life_with_only_father','life_with_uncles','life_with_friends','life_with_cousins','life_with_brothers',
          'life_with_alone','illness','especial_food','who_invite_me', 'who_invite_me_number','do_you_want_ej',
          'why_fds','other_experiences','pieces_save')

class InscriptionSerializer(serializers.HyperlinkedModelSerializer):
    young = YoungSerializer(many=False, read_only=False)
    pieces_save = serializers.SerializerMethodField()

    def get_pieces_save(self, obj):
        return obj.get_pieces_save_display()
    
    class Meta:
        model = Inscription
        fields = ('id', 'young', 'inscription_date', 'who_invite_me', 'pieces_save')

class ParentsSerializer(serializers.HyperlinkedModelSerializer):
    relationship = serializers.SerializerMethodField()

    def get_relationship(self, obj):
        return obj.get_relationship_display()

    class Meta:
        model = Parents
        fields = ('id', 'relationship', 'name_parent', 'occupation', 'home_phone', 'mobile_phone', 'address', 'isalive')
class BrothersSerializer(serializers.HyperlinkedModelSerializer):
    relationship = serializers.SerializerMethodField()

    def get_relationship(self, obj):
        return obj.get_relationship_display()

    class Meta:
        model = Brothers
        fields = ('id', 'relationship', 'name_brother', 'date_born', 'mobile_phone', 'email', 'isalive')