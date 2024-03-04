from django.db import models

from apps.base.utils.decorators import auto_slugify
from apps.words.models import Article, Language
from apps.words.models.pos import PartOfSpeech


@auto_slugify(field_name="title")
class Word(models.Model):
    slug = models.SlugField(editable=False)
    title = models.CharField(max_length=100)
    description = models.TextField(default="", blank=True, null=True)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    articles = models.ManyToManyField(Article, blank=True)
    parts_of_speech = models.ManyToManyField(PartOfSpeech, blank=True, verbose_name="Parts of Speech")
    sentence = models.TextField(default="", blank=True, null=True)
    level = models.CharField(
        max_length=2, choices=[("a1", "A1"), ("a2", "A2"), ("b1", "B1"), ("b2", "B2"), ("c2", "C2")]
    )
    # translations = models.ManyToManyField("self", blank=True, symmetrical=True)

    class Meta:
        unique_together = ["title", "language"]

    def __str__(self):
        return f"{self.title} | {self.language}"
