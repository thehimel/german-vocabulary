from apps.words import models as word_models


class PreWord(word_models.Word):
    class Meta:
        verbose_name = "Word"


class PreBundle(word_models.Bundle):
    class Meta:
        verbose_name = "Bundle"
