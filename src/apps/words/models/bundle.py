from django.db import models

from apps.base.utils.decorators import auto_slugify
from apps.words.models import Image, Word


@auto_slugify(field_name="title")
class Bundle(models.Model):
    slug = models.SlugField(editable=False)
    title = models.CharField(max_length=100)
    description = models.TextField(default="", blank=True, null=True)
    image = models.ManyToManyField(Image, blank=True)
    words = models.ManyToManyField(Word, blank=True)

    def __str__(self):
        return self.title
