from django_filters import rest_framework as filters
from .models import TODO


class TodoFilter(filters.FilterSet):
    date_between = filters.DateFromToRangeFilter(field_name="created_at", label="Date (Between)")

    class Meta:
        model = TODO
        fields = [
            "project",
            "note_text",
            "created_at",
            "updated_at",
            "creator",
            "is_active",
            "date_between",
        ]
