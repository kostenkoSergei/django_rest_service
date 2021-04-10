import graphene
from graphene_django import DjangoObjectType
from rest_users.models import User
from rest_TODO.models import Project, TODO


class TODOType(DjangoObjectType):
    class Meta:
        model = TODO
        fields = "__all__"


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = "__all__"


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = "__all__"


class Query(graphene.ObjectType):
    all_TODOS = graphene.List(TODOType)
    all_projects = graphene.List(ProjectType)

    def resolve_all_TODOS(root, info):
        return TODO.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()


schema = graphene.Schema(query=Query)
