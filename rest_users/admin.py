from django.contrib import admin

from rest_users.models import User


class UserAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'username', 'email', 'age')
    list_display_links = ('first_name', 'last_name', 'username')


admin.site.register(User, UserAdmin)
