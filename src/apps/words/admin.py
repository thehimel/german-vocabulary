from django.contrib import admin
from apps.words.models import Article, Language, Vocabulary
from apps.words.forms import LanguageForm


class LanguageAdmin(admin.ModelAdmin):
    form = LanguageForm

    def get_readonly_fields(self, request, obj=None):
        """Make 'slug' read-only during updates only for admin panel."""
        if obj:
            return ["slug"] + list(super().get_readonly_fields(request, obj))
        return super().get_readonly_fields(request, obj)


admin.site.register(Article)
admin.site.register(Language, LanguageAdmin)
admin.site.register(Vocabulary)
