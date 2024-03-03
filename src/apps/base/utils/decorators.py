from django.utils.text import slugify


def auto_generate_slug(field_name: str):
    def decorator(model_class):
        def save_with_auto_slug(self, *args, **kwargs):
            setattr(self, 'slug', slugify(getattr(self, field_name)))
            super(model_class, self).save(*args, **kwargs)

        setattr(model_class, 'save', save_with_auto_slug)
        return model_class

    return decorator
