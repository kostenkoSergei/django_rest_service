import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
# from django.contrib.auth.models import User
from rest_TODO.views import ProjectModelViewSet, TodoModelViewSet
from rest_users.views import UserModelViewSet
from rest_TODO.models import TODO, Project
from rest_users.models import User
from django.contrib.auth import get_user_model


class TestProjectsViewSet(TestCase):
    # APIRequestFactory
    # tests for unauthorized users
    def test_get_list(self):
        """to check page with projects list"""
        factory = APIRequestFactory()
        request = factory.get('/api/projects/')
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        print(response.status_code)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        """to check note creation by unauthorised user"""
        factory = APIRequestFactory()
        request = factory.post('/api/todos/',
                               {"project": 1, "note_text": "some text", "creator": 14, "is_active": False},
                               format='json')
        view = TodoModelViewSet.as_view({'post': 'create'})
        response = view(request)
        print(response.status_code)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # test for authorized users
    def test_create_admin(self):
        factory = APIRequestFactory()
        project = Project.objects.create(name='Test', repo_link='some link')  # created project for test database (pk=1)
        request = factory.post('/api/todos/',
                               {"project": 1, "note_text": "test",
                                "creator": 1, "is_active": True},
                               format='json')
        admin = User.objects.create_superuser('admin', 'testadmin@admin.com', 'admin123456')  # created user (pk=1)
        print(admin.is_superuser)
        print(admin.is_staff)
        force_authenticate(request, admin)
        view = TodoModelViewSet.as_view({'post': 'create'})
        response = view(request)
        print(response.status_code)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    # APIClient
    def test_get_detail(self):
        project = Project.objects.create(name='Test', repo_link='some link')
        client = APIClient()
        response = client.get(f'/api/projects/{project.id}/')
        print(response.status_code)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_guest(self):
        project = Project.objects.create(name='Test', repo_link='some link')
        client = APIClient()
        response = client.put(f'/api/projects/{project.id}/', {"name": "Test2"})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin(self):
        project = Project.objects.create(name='Test2', repo_link='some link')
        client = APIClient()
        admin = User.objects.create_superuser('admin5', 'admin5@admin.com', 'admin1234567')
        todo = TODO.objects.create(project=project, note_text='some link1', creator=admin)
        client.login(username='admin5', password='admin1234567')
        response = client.put(f'/api/todos/{todo.pk}/', {"project": 1, "note_text": "some new link", "creator": 1})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo = TODO.objects.get(id=todo.id)
        self.assertEqual(todo.project, project)
        self.assertEqual(todo.note_text, 'some new link')
        client.logout()


# APITestCase
class TestBookViewSet(APITestCase):

    def test_get_list(self):
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_admin(self):
        project = Project.objects.create(name='Test3', repo_link='some link')
        admin = User.objects.create_superuser('admin6', 'admin@admin.com', 'admin123456')
        todo = TODO.objects.create(project=project, note_text='some link1', creator=admin)
        self.client.login(username='admin6', password='admin123456')
        response = self.client.put(f'/api/todos/{todo.pk}/',
                                   {'note_text': 'new text', 'project': project.pk, "creator": 1})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo = TODO.objects.get(id=todo.id)
        self.assertEqual(todo.note_text, 'new text')

    def test_edit_mixer(self):
        """using mixer"""
        project = mixer.blend(Project)
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        todo = TODO.objects.create(project=project, note_text='some link1', creator=admin)
        self.client.login(username='admin', password='admin123456')
        response = self.client.put(f'/api/todos/{todo.pk}/',
                                   {'note_text': 'new text', 'project': project.pk, "creator": 1})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo = TODO.objects.get(id=todo.id)
        self.assertEqual(todo.note_text, 'new text')
