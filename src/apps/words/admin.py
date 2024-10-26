from django.contrib import admin
from django.db.models.functions import Lower
from django.utils.safestring import mark_safe
from django.utils.html import format_html

from apps.base.utils.decorators import make_slug_readonly_during_update
from apps.words.decorators import join_field_values
from apps.words.forms import LanguageForm, WordForm
from apps.words.models import Article, Bundle, Image, Language, Note, PartOfSpeech, Word


@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    ordering = ["-modified", "title"]
    list_display = ["title", "image_preview", "modified"]
    search_fields = ["title", "description"]
    list_filter = ["created", "modified"]
    readonly_fields = ["created", "modified"]

    fieldsets = (
        (None, {"fields": ("title", "description", "image")}),
        ("Timestamps", {"fields": ("created", "modified")}),
    )

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" style="object-fit: cover;" />', obj.image.url)
        return "-"
    image_preview.short_description = "Preview"


class ArticleAdmin(admin.ModelAdmin):
    ordering = ["-modified", "title"]
    list_display = ["title", "modified"]


class PartOfSpeechAdmin(admin.ModelAdmin):
    ordering = ["-modified", "title"]
    list_display = ["title", "modified"]


class LanguageAdmin(admin.ModelAdmin):
    form = LanguageForm
    ordering = ["-modified", "code"]
    list_display = ["code", "modified"]


class NoteAdmin(admin.ModelAdmin):
    ordering = ["-modified", "language", "title"]
    list_display = ["__str__", "language", "modified"]


class BundleAdmin(admin.ModelAdmin):
    search_fields = ["title"]
    ordering = ["-modified", "title"]
    list_display = ["title", "modified"]


@make_slug_readonly_during_update
@join_field_values("articles", "title", "all_articles")
@join_field_values("translations", "title", "all_translations")
@join_field_values("linked_words", "title", "all_linked_words")
class WordAdmin(admin.ModelAdmin):
    form = WordForm
    search_fields = ["title"]
    ordering = ["-modified", "language__code", Lower("title")]
    list_display = [
        "title",
        "part_of_speech",
        "all_translations",
        "plural",
        "all_articles",
        "sentenceS",
        "language",
        "level",
        "modified",
        "all_linked_words",
    ]
    list_filter = ["hidden", "part_of_speech", "level", "language__code"]
    list_per_page = 8

    @staticmethod
    def sentenceS(obj):
        sentences = [obj.sentence] + [word.sentence for word in obj.translations.all().order_by("-language__code")]
        return mark_safe("<br>".join(sentences))


admin.site.register(Article, ArticleAdmin)
admin.site.register(PartOfSpeech, PartOfSpeechAdmin)
admin.site.register(Language, LanguageAdmin)
admin.site.register(Note, NoteAdmin)
admin.site.register(Word, WordAdmin)
admin.site.register(Bundle, BundleAdmin)
