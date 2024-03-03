from django.conf import settings
from django.db import models
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _


class Language(models.Model):
    """
    During adding a language, it shows all the available languages from settings where the list of languages are saved
    in a pair of (code, name) i.e. ('en', 'English').

    A dictionary is created from this list of tuple to return the corresponding name during string representation of the
    object specially helpful in the list of this model in the admin panel.

    The 'slug' field is not editable and is read only in detail view in the admin panel only during the update view.
    """

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
