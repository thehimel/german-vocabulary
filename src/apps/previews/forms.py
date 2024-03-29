from django import forms

from apps.base.utils.decorators import filter_data_by_field
from apps.previews.models import PreWord, Preview
from apps.words.models import Article, Language


class PreWordForm(forms.ModelForm):
    class Meta:
        model = PreWord
        fields = "__all__"

    @filter_data_by_field(
        destination_class=Article,
        destination_field_name="articles",
        source_class=Language,
        source_field_name="language",
        dependency_field_name="articles",
    )
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)


class PreviewForm(forms.ModelForm):
    class Meta:
        model = Preview
        fields = "__all__"

    @filter_data_by_field(
        destination_class=Article,
        destination_field_name="article",
        source_class=Language,
        source_field_name="language",
        dependency_field_name="articles",
    )
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
