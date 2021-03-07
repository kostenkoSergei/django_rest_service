from rest_framework.relations import StringRelatedField
from rest_framework.serializers import ModelSerializer, ValidationError
from .models import TODO, Project
from rest_users.serializers import UserModelSerializer


class ProjectModelSerializer(ModelSerializer):
    contributors = StringRelatedField(many=True)

    def validate_name(self, value):
        if len(value) < 10:
            raise ValidationError('Слишком короткое название проекта')
        return value

    class Meta:
        model = Project
        fields = '__all__'


class TodoModelSerializer(ModelSerializer):
    project = ProjectModelSerializer()
    creator = UserModelSerializer()

    class Meta:
        model = TODO
        fields = '__all__'
