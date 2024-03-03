from django.conf import settings
from django.db import models
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _


class Language(models.Model):
    languages, code_choices = dict(), list()
    for pt1, name in settings.LANGUAGES:
        language = (pt1, _(name))
        code_choices.append(language)
        languages.update([language])

    code = models.CharField(unique=True, max_length=7, choices=code_choices)
    slug = models.SlugField(editable=False)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.code)
        super().save(*args, **kwargs)

    def __str__(self):
        return str(self.languages.get(self.code, self.code))
