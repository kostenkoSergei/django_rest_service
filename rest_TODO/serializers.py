from rest_framework.relations import StringRelatedField
from rest_framework.serializers import ModelSerializer
from .models import TODO, Project
from rest_users.serializers import UserModelSerializer


class ProjectModelSerializer(ModelSerializer):
    contributors = StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class TodoModelSerializer(ModelSerializer):
    project = ProjectModelSerializer()
    creator = UserModelSerializer()

    class Meta:
        model = TODO
        fields = '__all__'
