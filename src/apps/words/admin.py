from django.contrib import admin
from django.db.models.functions import Lower

from apps.base.utils.decorators import make_slug_readonly_during_update
from apps.words.forms import LanguageForm, WordForm
from apps.words.models import Article, Bundle, Image, Language, PartOfSpeech, Word


class LanguageAdmin(admin.ModelAdmin):
    form = LanguageForm


class BundleAdmin(admin.ModelAdmin):
    search_fields = ["title"]
    ordering = ["title"]


@make_slug_readonly_during_update
class WordAdmin(admin.ModelAdmin):
    form = WordForm
    search_fields = ["title"]
    ordering = ["language__code", Lower("title")]
    list_display = ["title", "language", "level"]
    list_filter = ["hidden", "level", "language__code"]


admin.site.register(Image)
admin.site.register(Article)
admin.site.register(PartOfSpeech)
admin.site.register(Language, LanguageAdmin)
admin.site.register(Word, WordAdmin)
admin.site.register(Bundle, BundleAdmin)
