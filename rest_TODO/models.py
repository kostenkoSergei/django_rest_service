from django.db import models
from rest_users.models import User


class Project(models.Model):
    name = models.CharField(max_length=64, unique=True, verbose_name='Название проекта')
    repo_link = models.URLField(max_length=200, verbose_name='Ссылка на репозиторий')
    contributors = models.ManyToManyField(User, verbose_name='Участники')

    def __str__(self):
        return self.name


class TODO(models.Model):
    project = models.ForeignKey(Project, models.PROTECT, verbose_name='Проект')
    note_text = models.TextField(blank=False, verbose_name='Заметка')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Создано')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Обновлено')
    creator = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name='Автор заметки')
    is_active = models.BooleanField(default=True, verbose_name='Статус')
