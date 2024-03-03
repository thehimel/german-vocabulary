from django import forms
from django.utils.translation import gettext as _
from django.core.exceptions import ValidationError
from django.shortcuts import get_object_or_404


def validate_file_size(file, max_size=2):
    """The max_size in MB."""

    max_limit = max_size * 1024 * 1024
    if file.size > max_limit:
        raise ValidationError(
            f"File size too large. File size should not exceed {max_size} MB. "
            f"Current file size is {file.size / (1024 * 1024):.2f} MB."
        )


def validate_content_type(value, content_types, message):
    """
    File type options, content_types = ['application/pdf', 'video/mp4', 'audio/mpeg']

    When we create the model, that time file field will be there. When we update the model and don't upload any file,
    no file will exist. That time it will through error that content_type not available. Thus, we need to check if the
    object has the attribute. The try-except doesn't work here.
    """
    if hasattr(value.file, "content_type"):
        if value.file.content_type not in content_types:
            raise ValidationError(message)


def validate_content_type_jpeg(value):
    content_types = ["image/jpeg"]
    message = "Only JPG or JPEG file is accepted."
    validate_content_type(value, content_types, message)


def validate_field_unchanged(model, field):
    """Ensure the field is not be changed."""
    def decorator(func):
        def wrapper(self, *args, **kwargs):
            if self.instance.pk:
                old_instance = get_object_or_404(klass=model, pk=self.instance.pk)
                old_value = getattr(old_instance, field, None)
                new_value = self.cleaned_data.get(field, None)

                if old_value and new_value and old_value != new_value:
                    raise forms.ValidationError(_(f"The {field} field cannot be changed."))

            return func(self, *args, **kwargs)
        return wrapper
    return decorator
