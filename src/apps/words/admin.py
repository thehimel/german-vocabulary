from django.contrib import admin

from apps.base.utils.decorators import make_slug_readonly_during_update
from apps.words.forms import LanguageForm, VocabularyForm
from apps.words.models import Article, Language, Vocabulary


@make_slug_readonly_during_update
class LanguageAdmin(admin.ModelAdmin):
    form = LanguageForm


class VocabularyAdmin(admin.ModelAdmin):
    form = VocabularyForm


admin.site.register(Article)
admin.site.register(Language, LanguageAdmin)
admin.site.register(Vocabulary, VocabularyAdmin)
