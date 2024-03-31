from django.contrib import admin
from django.db.models.functions import Lower

from apps.previews.forms import PreviewForm, PreWordForm
from apps.previews.models import Preview, PreWord
from apps.words.decorators import join_field_values


@join_field_values("articles", "title", "all_articles")
class PreWordAdmin(admin.ModelAdmin):
    form = PreWordForm
    search_fields = ["title"]
    ordering = ["-modified", "language__code", Lower("title")]
    list_display = [
        "title",
        "language",
        "part_of_speech",
        "plural",
        "all_articles",
        "sentence",
        "level",
        "modified",
    ]
    list_filter = ["part_of_speech", "hidden", "level", "language__code"]
    list_per_page = 8


class PreBundleAdmin(admin.ModelAdmin):
    form = PreviewForm
    search_fields = ["title"]
    ordering = ["-modified", "language__code", Lower("title")]
    list_display = [
        "title",
        "language",
        "part_of_speech",
        "article",
        "level",
        "in_review",
        "approved",
        "merged",
        "modified",
    ]
    list_filter = ["in_review", "approved", "merged", "part_of_speech", "level", "language__code"]
    list_per_page = 8


admin.site.register(PreWord, PreWordAdmin)
admin.site.register(Preview, PreBundleAdmin)
