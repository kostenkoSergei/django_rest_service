from django.core.management.base import BaseCommand, CommandError
from rest_users.models import User


class Command(BaseCommand):
    help = 'Create user in database'

    def add_arguments(self, parser):
        parser.add_argument('username', type=str)
        parser.add_argument('first_name', type=str)
        parser.add_argument('last_name', type=str)
        parser.add_argument('email')
        parser.add_argument('password')
        parser.add_argument('is_superuser', type=bool)
        parser.add_argument('age', type=int)

    def handle(self, *args, **options):
        new_user = User(
            username=options['username'],
            first_name=options['first_name'],
            last_name=options['last_name'],
            email=options['email'],
            password=options['password'],
            is_superuser=options['is_superuser'],
            age=options['age']
        )
        new_user.save()
        self.stdout.write(self.style.SUCCESS('Добавлен новый пользователь'))
