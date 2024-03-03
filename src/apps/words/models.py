from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _

from apps.base.utils.decorators import auto_generate_slug


@auto_generate_slug(field_name="article")
class Article(models.Model):
    slug = models.SlugField(editable=False)
    article = models.CharField(max_length=5)

    def __str__(self):
        return self.article


@auto_generate_slug(field_name="code")
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

    slug = models.SlugField(editable=False)
    code = models.CharField(unique=True, max_length=7, choices=code_choices)
    articles = models.ManyToManyField(Article, blank=True)

    def __str__(self):
        return str(self.languages.get(self.code, self.code))


@auto_generate_slug(field_name="word")
class Vocabulary(models.Model):
    slug = models.SlugField(editable=False)
    word = models.CharField(max_length=100)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    articles = models.ManyToManyField(Article, blank=True)

    class Meta:
        verbose_name_plural = "Vocabulary"
        unique_together = ["word", "language"]

    def __str__(self):
        return f"{self.word} | {self.language}"
