from django.contrib import admin

from apps.base.utils.decorators import make_slug_readonly_during_update
from apps.words.forms import LanguageForm, WordForm
from apps.words.models import Article, Image, Language, Word
from apps.words.models.bundle import Bundle
from apps.words.models.pos import PartOfSpeech


class LanguageAdmin(admin.ModelAdmin):
    form = LanguageForm


@make_slug_readonly_during_update
class WordAdmin(admin.ModelAdmin):
    form = WordForm


admin.site.register(Article)
admin.site.register(PartOfSpeech)
admin.site.register(Image)
admin.site.register(Language, LanguageAdmin)
admin.site.register(Word, WordAdmin)
admin.site.register(Bundle)
