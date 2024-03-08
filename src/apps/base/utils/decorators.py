from functools import wraps
from typing import Type

from django.contrib import admin
from django.db import models
from django.utils.text import slugify

from django.shortcuts import redirect


def auto_slugify(field_name: str):
    def decorator(model_class):
        def save_with_auto_slug(self, *args, **kwargs):
            setattr(self, "slug", slugify(getattr(self, field_name)))
            super(model_class, self).save(*args, **kwargs)

        setattr(model_class, "save", save_with_auto_slug)
        return model_class

    return decorator


def make_slug_readonly_during_update(model_admin: admin.ModelAdmin):
    """
    Decorator to make 'slug' read-only during updates only for admin panel.
    Usage: Add @make_slug_readonly_during_update to your ModelAdmin class.
    """

    def get_readonly_fields(self, request, obj=None):
        if obj:
            return ["slug"] + list(super(model_admin, self).get_readonly_fields(request, obj))
        return super(model_admin, self).get_readonly_fields(request, obj)

    model_admin.get_readonly_fields = get_readonly_fields
    return model_admin


def filter_data_by_field(
    destination_class: Type[models.Model],
    destination_field_name: str,
    source_class: Type[models.Model],
    source_field_name: str,
):
    def decorator(func):
        @wraps(func)
        def wrapper(self, *args, **kwargs):
            # Call the original __init__ method
            func(self, *args, **kwargs)

            if source_field_name in self.fields:
                selected_source = self.data.get(source_field_name) or self.initial.get(source_field_name)

                # If a source is selected, filter the data based on that source
                if selected_source:
                    language = source_class.objects.get(pk=selected_source)
                    self.fields[destination_field_name].queryset = getattr(language, destination_field_name).all()
                else:
                    # If no source is selected, set the destination field queryset to all.
                    self.fields[destination_field_name].queryset = destination_class.objects.all()

        return wrapper

    return decorator


def validate_language_preferences(view_func):
    @wraps(view_func)
    def _wrapped_view(self, *args, **kwargs):
        primary_language = self.request.COOKIES.get("primary_language")

        if not primary_language:
            return redirect("base:language_preferences")

        return view_func(self, *args, **kwargs)

    return _wrapped_view
