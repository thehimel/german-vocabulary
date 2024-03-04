from django.db import models
from apps.base.utils.decorators import auto_generate_slug

from apps.words.models.image import Image
from apps.words.models.article import Article
from apps.words.models.language import Language


@auto_generate_slug(field_name="word")
class Word(models.Model):
    slug = models.SlugField(editable=False)
    word = models.CharField(max_length=100)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    articles = models.ManyToManyField(Article, blank=True)
    image = models.ManyToManyField(Image, blank=True)

    class Meta:
        verbose_name_plural = "Words"
        unique_together = ["word", "language"]

    def __str__(self):
        return f"{self.word} | {self.language}"
