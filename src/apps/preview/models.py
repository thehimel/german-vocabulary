from django.db import models

from apps.words.models import Language, Article, PartOfSpeech, Note


class PreviewWord(models.Model):
    title = models.CharField(max_length=100)
    plural = models.CharField(max_length=100, blank=True, null=True)
    language = models.ForeignKey(Language, on_delete=models.SET_NULL, null=True)
    articles = models.ManyToManyField(Article, blank=True)
    parts_of_speech = models.ManyToManyField(PartOfSpeech, blank=True, verbose_name="Parts of Speech")
    sentence = models.TextField(default="", blank=True, null=True)
    level = models.CharField(
        max_length=2, choices=[("a1", "A1"), ("a2", "A2"), ("b1", "B1"), ("b2", "B2"), ("c1", "C1"), ("c2", "C2")]
    )
    notes = models.ManyToManyField(Note, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    approved = models.BooleanField(default=False)

    class Meta:
        unique_together = ["title", "language"]
        verbose_name = "Word"

    def __str__(self):
        return f"{self.title} | {self.language}"


class PreviewBundle(models.Model):
    title = models.CharField(max_length=100)
    preview_words = models.ManyToManyField(PreviewWord, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    approved = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Bundle"

    def __str__(self):
        return self.title
