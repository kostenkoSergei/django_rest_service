from rest_framework.relations import StringRelatedField
from rest_framework.serializers import ModelSerializer, ValidationError
from .models import TODO, Project
from rest_users.serializers import UserModelSerializer


class ProjectModelSerializer(ModelSerializer):
    # contributors = StringRelatedField(many=True)

    def validate_name(self, value):
        if len(value) < 10:
            raise ValidationError('Слишком короткое название проекта')
        return value

    class Meta:
        model = Project
        fields = '__all__'


class TodoModelSerializer(ModelSerializer):
    """will be used in post and put methods. eliminates problems with nested fields while saving data"""

    class Meta:
        model = TODO
        fields = '__all__'


class TodoModelFullSerializer(ModelSerializer):
    """will be used in get method for full data representation"""
    project = ProjectModelSerializer()
    creator = UserModelSerializer()

    class Meta:
        model = TODO
        fields = '__all__'
