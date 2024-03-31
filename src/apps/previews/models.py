from django.db import models

from apps.words.models import Article, Language, Note, PartOfSpeech, Word
from apps.words.utils import getLevelChoices


class PreWord(models.Model):
    title = models.CharField(max_length=100)
    language = models.ForeignKey(Language, on_delete=models.SET_NULL, null=True)
    part_of_speech = models.ForeignKey(
        PartOfSpeech, verbose_name="Part of Speech", on_delete=models.SET_NULL, null=True, blank=True
    )
    articles = models.ManyToManyField(Article, blank=True)
    plural = models.CharField(max_length=100, blank=True, null=True)
    sentence = models.TextField(default="", blank=True, null=True)
    level = models.CharField(max_length=2, choices=getLevelChoices())
    description = models.TextField(default="", blank=True, null=True)
    hidden = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Word"
        unique_together = ["title", "language", "part_of_speech"]

    def __str__(self):
        return f"{self.title} | {self.language}"


class Preview(models.Model):
    title = models.CharField(max_length=100)
    level = models.CharField(max_length=2, choices=getLevelChoices())
    language = models.ForeignKey(Language, on_delete=models.SET_NULL, null=True)
    part_of_speech = models.ForeignKey(
        PartOfSpeech, verbose_name="Part of Speech", on_delete=models.SET_NULL, null=True, blank=True
    )
    article = models.ForeignKey(Article, on_delete=models.SET_NULL, null=True, blank=True)
    words = models.ManyToManyField(PreWord, blank=True)
    description = models.TextField(default="", blank=True, null=True)
    in_review = models.BooleanField(default=False, verbose_name="In Review")
    approved = models.BooleanField(default=False)
    merged = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ["title", "language", "part_of_speech"]

    def save(self, *args, **kwargs):
        if self.pk and self.approved and not self.merged:
            words = []
            for word in self.words.all():
                existing_word = Word.objects.filter(title=word.title, language=word.language, part_of_speech=word.part_of_speech).first()
                if existing_word:
                    words.append(existing_word)
                else:
                    new_word = Word.objects.create(
                        title=word.title,
                        language=word.language,
                        part_of_speech=word.part_of_speech,
                        plural=word.plural,
                        sentence=word.sentence,
                        level=word.level,
                        description=word.description,
                        hidden=word.hidden
                    )
                    new_word.articles.set(word.articles.all())
                    words.append(new_word)
            for word in words:
                for translation in words:
                    if word != translation:
                        word.translations.add(translation)
                word.save()
            self.merged = True
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} | {self.language}"
