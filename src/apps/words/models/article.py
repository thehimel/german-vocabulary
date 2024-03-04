from django.db import models

from apps.base.utils.decorators import auto_slugify


@auto_slugify(field_name="article")
class Article(models.Model):
    slug = models.SlugField(editable=False)
    article = models.CharField(max_length=5, unique=True)

    def __str__(self):
        return self.article
