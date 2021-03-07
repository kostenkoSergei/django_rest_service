from django.contrib import admin

from rest_TODO.models import Project, TODO


class TODOAdmin(admin.ModelAdmin):
    list_display = [field.name for field in TODO._meta.get_fields()]
    list_display_links = ('project',)


class ProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'repo_link')
    list_display_links = ('name',)


admin.site.register(Project, ProjectAdmin)
admin.site.register(TODO, TODOAdmin)
