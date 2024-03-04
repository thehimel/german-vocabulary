from django.db import models

from apps.base.utils.images import resize_image
from apps.base.utils.validators import validate_file_size, validate_alphanumeric
from apps.users.constants import DEFAULT_WORD_IMAGE


class Image(models.Model):
    title = models.CharField(max_length=100, unique=True, validators=[validate_alphanumeric])
    image = models.ImageField(default=DEFAULT_WORD_IMAGE, upload_to="words/", validators=[validate_file_size])
    description = models.TextField(default="", blank=True, null=True)

    def save(self, *args, **kwargs):
        self.title = self.title.lower()
        resize_image(instance=self, field_name="image", title=self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return str(self.image.path.split("/media/", maxsplit=1)[1])  # The part after '/media/'
