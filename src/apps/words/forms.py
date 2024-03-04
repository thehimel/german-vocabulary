from django import forms

from apps.base.utils.validators import validate_field_unchanged

from apps.words.models.article import Article
from apps.words.models.language import Language
from apps.words.models.word import Word


class LanguageForm(forms.ModelForm):
    class Meta:
        model = Language
        fields = "__all__"

    @validate_field_unchanged(model=Language, field="code")
    def clean_code(self):
        return self.cleaned_data["code"]


class VocabularyForm(forms.ModelForm):
    class Meta:
        model = Word
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if "language" in self.fields:
            # Get the selected language from the form data (if available)
            selected_language = self.data.get("language") or self.initial.get("language")

            # If a language is selected, filter the articles based on that language
            if selected_language:
                language = Language.objects.get(pk=selected_language)
                self.fields["articles"].queryset = language.articles.all()
            else:
                # If no language is selected, set the articles queryset to all articles
                self.fields["articles"].queryset = Article.objects.all()
