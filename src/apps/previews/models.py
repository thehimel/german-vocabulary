from django.db import models
from apps.words.models import Article, Language, PartOfSpeech
from apps.words.utils import getLevelChoices


class PreWord(models.Model):
    title = models.CharField(max_length=100)
    plural = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(default="", blank=True, null=True)
    language = models.ForeignKey(Language, on_delete=models.SET_NULL, null=True)
    articles = models.ManyToManyField(Article, blank=True)
    parts_of_speech = models.ManyToManyField(PartOfSpeech, blank=True, verbose_name="Parts of Speech")
    sentence = models.TextField(default="", blank=True, null=True)
    level = models.CharField(max_length=2, choices=getLevelChoices())
    hidden = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Word"
        unique_together = ["title", "language"]


class PreBundle(models.Model):
    title = models.CharField(max_length=100)
    level = models.CharField(max_length=2, choices=getLevelChoices())
    description = models.TextField(default="", blank=True, null=True)
    language = models.ForeignKey(Language, on_delete=models.SET_NULL, null=True)
    part_of_speech = models.ForeignKey(
        PartOfSpeech, verbose_name="Part of Speech", on_delete=models.SET_NULL, null=True, blank=True
    )
    article = models.ForeignKey(Article, on_delete=models.SET_NULL, null=True, blank=True)
    words = models.ManyToManyField(PreWord, blank=True)
    in_review = models.BooleanField(default=False, verbose_name="In Review")
    approved = models.BooleanField(default=False)
    merged = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Bundle"
        unique_together = ["title", "language", "part_of_speech"]

    def __str__(self):
        return f"{self.title} | {self.language}"
