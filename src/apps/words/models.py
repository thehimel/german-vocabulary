from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _

from apps.base.utils.decorators import auto_slugify
from apps.base.utils.images import resize_image
from apps.base.utils.validators import validate_alphanumeric, validate_file_size
from apps.users.constants import DEFAULT_WORD_IMAGE


class Image(models.Model):
    title = models.CharField(max_length=100, unique=True, validators=[validate_alphanumeric])
    image = models.ImageField(default=DEFAULT_WORD_IMAGE, upload_to="words/", validators=[validate_file_size])
    description = models.TextField(default="", blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        self.title = self.title.lower()
        resize_image(instance=self, field_name="image", title=self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return str(self.image.url.split("/media/", maxsplit=1)[1])  # The part after '/media/'


@auto_slugify(field_name="title")
class Article(models.Model):
    slug = models.SlugField(editable=False)
    title = models.CharField(max_length=5, unique=True)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class PartOfSpeech(models.Model):
    title = models.CharField(max_length=20, unique=True)
    bundle = models.ForeignKey("Bundle", on_delete=models.SET_NULL, null=True)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Part of Speech"
        verbose_name_plural = "Parts of Speech"
        unique_together = ("title", "bundle")

    def __str__(self):
        return self.title


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
    articles = models.ManyToManyField(Article, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.languages.get(self.code, self.code))


class Note(models.Model):
    title = models.TextField(default="", blank=True, null=True)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        size, max_size = len(self.title), 100
        return f"{self.title if size <= max_size else self.title[:max_size]+'...'}"


@auto_slugify(field_name="title")
class Word(models.Model):
    slug = models.SlugField(editable=False)
    title = models.CharField(max_length=100)
    plural = models.CharField(max_length=100, blank=True, null=True)
    linked_words = models.ManyToManyField("self", blank=True, symmetrical=True, verbose_name="Linked Words")
    translations = models.ManyToManyField("self", blank=True, symmetrical=False)
    description = models.TextField(default="", blank=True, null=True)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    articles = models.ManyToManyField(Article, blank=True)
    parts_of_speech = models.ManyToManyField(PartOfSpeech, blank=True, verbose_name="Parts of Speech")
    sentence = models.TextField(default="", blank=True, null=True)
    level = models.CharField(
        max_length=2, choices=[("a1", "A1"), ("a2", "A2"), ("b1", "B1"), ("b2", "B2"), ("c1", "C1"), ("c2", "C2")]
    )
    hidden = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ["title", "language"]

    def __str__(self):
        return f"{self.title} | {self.language}"


@auto_slugify(field_name="title")
class Bundle(models.Model):
    slug = models.SlugField(editable=False)
    title = models.CharField(max_length=100)
    description = models.TextField(default="", blank=True, null=True)
    image = models.ManyToManyField(Image, blank=True)
    words = models.ManyToManyField(Word, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
