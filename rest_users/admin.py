from django.contrib import admin

from rest_users.models import User


class UserAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'username', 'email', 'age')


admin.site.register(User, UserAdmin)
