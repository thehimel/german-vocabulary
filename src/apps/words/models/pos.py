from django.db import models


class PartOfSpeech(models.Model):
    title = models.CharField(max_length=20, unique=True)

    class Meta:
        verbose_name = "Part of Speech"
        verbose_name_plural = "Parts of Speech"

    def __str__(self):
        return self.title
