from django.db import models
from pprint import pprint


class Language(models.Model):
    code = models.CharField(max_length=2)
    slug = models.SlugField(unique=True, editable=False)
