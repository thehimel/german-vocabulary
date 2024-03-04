from django.db import models

from apps.base.utils.images import resize_image
from apps.base.utils.validators import validate_file_size
from apps.users.constants import DEFAULT_WORD_IMAGE


class Image(models.Model):
    image = models.ImageField(
        default=DEFAULT_WORD_IMAGE, upload_to="words/", validators=[validate_file_size], unique=True
    )
    description = models.TextField(default="", blank=True, null=True)

    def save(self, *args, **kwargs):
        resize_image(instance=self, field_name="image")
        super().save(*args, **kwargs)

    def __str__(self):
        return str(self.image.path.split("/media/", maxsplit=1)[1])  # The part after '/media/'
