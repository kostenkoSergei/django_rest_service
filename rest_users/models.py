from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    age = models.SmallIntegerField(blank=True, null=True)
    email = models.EmailField(unique=True)

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
