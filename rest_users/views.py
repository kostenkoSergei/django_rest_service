from django.shortcuts import render

from rest_framework.viewsets import ModelViewSet
from rest_framework import viewsets, mixins
from .models import User
from .serializers import UserModelSerializer


class UserModelViewSet(ModelViewSet):
    """first way. allow to get list of users, specific user,
    to change existing user data. delete and post are prohibited"""
    queryset = User.objects.exclude(username='admin')
    serializer_class = UserModelSerializer
    http_method_names = ['get', 'put', 'head']


# class UserModelViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
#                        viewsets.GenericViewSet):
#     """second way: using GenericViewSet and mixins. allow to get list of users, specific user,
#     to change existing user data. delete and post are prohibited"""
#     queryset = User.objects.exclude(username='admin')
#     serializer_class = UserModelSerializer
