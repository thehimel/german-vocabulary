from django.db import models
from apps.users.constants import DEFAULT_WORD_IMAGE
from apps.base.utils.validators import validate_file_size


class Image(models.Model):
    image = models.ImageField(default=DEFAULT_WORD_IMAGE, upload_to="words/", validators=[validate_file_size])
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return str(self.image.path.split("/media/", maxsplit=1)[1])  # The part after '/media/'
