from django import forms

from apps.base.utils.decorators import filter_data_by_field
from apps.base.utils.validators import validate_field_unchanged
from apps.words.models import Article, Language, Word
from apps.words.models.pos import PartOfSpeech


class LanguageForm(forms.ModelForm):
    class Meta:
        model = Language
        fields = "__all__"

    @validate_field_unchanged(model=Language, field_name="code")
    def clean_code(self):
        return self.cleaned_data["title"]


class WordForm(forms.ModelForm):
    class Meta:
        model = Word
        fields = "__all__"

    @filter_data_by_field(
        destination_class=Article,
        destination_field_name="articles",
        source_class=Language,
        source_field_name="language",
    )
    @filter_data_by_field(
        destination_class=PartOfSpeech,
        destination_field_name="parts_of_speech",
        source_class=Language,
        source_field_name="language",
    )
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
