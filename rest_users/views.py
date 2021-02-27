from django.shortcuts import render

from rest_framework.viewsets import ModelViewSet
from .models import User
from .serializers import UserModelSerializer


class UserModelViewSet(ModelViewSet):
    queryset = User.objects.exclude(username='admin')
    serializer_class = UserModelSerializer
