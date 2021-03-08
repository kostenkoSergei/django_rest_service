from django.shortcuts import render
from rest_framework.response import Response

from rest_framework.viewsets import ModelViewSet
from .models import Project, TODO
from .serializers import ProjectModelSerializer, TodoModelSerializer, TodoModelFullSerializer
from rest_framework.pagination import LimitOffsetPagination

from .filters import TodoFilter


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectModelViewSet(ModelViewSet):
    """all methods are available"""
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination

    def get_queryset(self):
        """added filtration using request parameters"""
        name = self.request.query_params.get('name', '')
        projects = Project.objects.all()
        if name:
            projects = projects.filter(name__contains=name)
        return projects


class TodoModelViewSet(ModelViewSet):
    """all methods are available"""
    queryset = TODO.objects.all()
    # serializer_class = TodoModelSerializer
    pagination_class = ToDoLimitOffsetPagination
    filterset_class = TodoFilter

    def destroy(self, request, *args, **kwargs):
        todo = self.get_object()
        todo.is_active = False
        todo.save()
        return Response(data='task is closed')

    def get_queryset(self):
        """added filtration using request parameters"""
        project = self.request.query_params.get('project', '')
        todos = TODO.objects.all()
        if project:
            todos = todos.filter(project=project)
        return todos

    def get_serializer_class(self, *args, **kwargs):
        if self.request.method in ['POST', 'PUT']:
            return TodoModelSerializer
        return TodoModelFullSerializer
