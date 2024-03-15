from django.contrib import admin
from django.db.models.functions import Lower

from apps.base.utils.decorators import make_slug_readonly_during_update
from apps.words.forms import LanguageForm, WordForm
from apps.words.models import Article, Bundle, Image, Language, PartOfSpeech, Word


class ImageAdmin(admin.ModelAdmin):
    ordering = ["-modified", "title"]
    list_display = ["title", "__str__", "modified", "created"]


class ArticleAdmin(admin.ModelAdmin):
    ordering = ["-modified", "article"]
    list_display = ["article", "modified", "created"]


class PartOfSpeechAdmin(admin.ModelAdmin):
    ordering = ["-modified", "title"]
    list_display = ["title", "modified", "created"]


class LanguageAdmin(admin.ModelAdmin):
    form = LanguageForm
    ordering = ["-modified", "code"]
    list_display = ["code", "modified", "created"]


class BundleAdmin(admin.ModelAdmin):
    search_fields = ["title"]
    ordering = ["-modified", "title"]
    list_display = ["title", "modified", "created"]


@make_slug_readonly_during_update
class WordAdmin(admin.ModelAdmin):
    form = WordForm
    search_fields = ["title"]
    ordering = ["-modified", "language__code", Lower("title")]
    list_display = ["title", "sentence", "language", "level", "modified", "created"]
    list_filter = ["hidden", "level", "language__code"]


admin.site.register(Image, ImageAdmin)
admin.site.register(Article, ArticleAdmin)
admin.site.register(PartOfSpeech, PartOfSpeechAdmin)
admin.site.register(Language, LanguageAdmin)
admin.site.register(Word, WordAdmin)
admin.site.register(Bundle, BundleAdmin)
