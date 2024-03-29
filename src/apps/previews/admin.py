from django.contrib import admin
from django.db.models.functions import Lower

from apps.previews.forms import PreWordForm
from apps.previews.models import PreBundle, PreWord


class PreBundleAdmin(admin.ModelAdmin):
    form = PreWordForm
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


admin.site.register(PreWord)
admin.site.register(PreBundle, PreBundleAdmin)
