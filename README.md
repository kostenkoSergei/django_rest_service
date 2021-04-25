### RestService
### django rest framework course

### для решения проблемы хешировани паролей кастомной модели пользователя
Explicitly, in your admin.py file make sure you have the following:

from django.contrib.auth.admin import UserAdmin
admin.site.register(CustomUserModel, UserAdmin)

###for JWTAuthentication
import requests
headers = {}
headers['Authorization'] = 'Bearer ""token goes here""'
r = requests.get('http://127.0.0.1:8000/api//...', headers=headers)
print(r.text)

To not found error when use loaddata to load fixture, exclude contenttype and auth.Permission modules. So the dump line will be:

python manage.py dumpdata --exclude=contenttypes --exclude=auth.Permission > datadump.json

