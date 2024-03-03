from django.contrib import admin

from apps.base.utils.decorators import make_slug_readonly_during_update
from apps.words.forms import LanguageForm, VocabularyForm
from apps.words.models.image import Image
from apps.words.models.article import Article
from apps.words.models.language import Language
from apps.words.models.vocabulary import Vocabulary


@make_slug_readonly_during_update
class LanguageAdmin(admin.ModelAdmin):
    form = LanguageForm


class VocabularyAdmin(admin.ModelAdmin):
    form = VocabularyForm


admin.site.register(Article)
admin.site.register(Image)
admin.site.register(Language, LanguageAdmin)
admin.site.register(Vocabulary, VocabularyAdmin)
