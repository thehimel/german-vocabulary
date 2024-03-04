from django.contrib import admin
from django.utils.text import slugify


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
