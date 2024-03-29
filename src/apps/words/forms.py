from django import forms
from django.db.models.functions import Lower

from apps.base.utils.decorators import filter_data_by_field
from apps.base.utils.validators import validate_field_unchanged
from apps.words.models import Article, Language, Word


class LanguageForm(forms.ModelForm):
    class Meta:
        model = Language
        fields = "__all__"

    @validate_field_unchanged(model=Language, field_name="code")
    def clean_code(self):
        return self.cleaned_data["code"]


class WordForm(forms.ModelForm):
    class Meta:
        model = Word
        fields = "__all__"

    @filter_data_by_field(
        destination_class=Article,
        destination_field_name="articles",
        source_class=Language,
        source_field_name="language",
        dependency_field_name="articles"
    )
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        instance = kwargs.get("instance")
        if instance:
            current_language = instance.language
            current_parts_of_speech = instance.parts_of_speech.all()
            self.fields["linked_words"].queryset = (
                Word.objects.filter(language=current_language, parts_of_speech__in=current_parts_of_speech)
                .exclude(pk=instance.pk)
                .order_by("-modified", "language__code", Lower("title"))
                .distinct()
            )

            self.fields["translations"].queryset = (
                Word.objects.filter(parts_of_speech__in=current_parts_of_speech)
                .exclude(language=current_language)
                .order_by("-modified", "language__code", Lower("title"))
                .distinct()
            )
