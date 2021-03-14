### RestService
### django rest framework course

### для решения проблемы хешировани паролей кастомной модели пользователя
Explicitly, in your admin.py file make sure you have the following:

from django.contrib.auth.admin import UserAdmin
admin.site.register(CustomUserModel, UserAdmin)