from django import forms
from apps.words.models import Language
from apps.base.utils.validators import validate_field_unchanged


class LanguageForm(forms.ModelForm):
    class Meta:
        model = Language
        fields = "__all__"

    @validate_field_unchanged(model=Language, field="code")
    def clean_code(self):
        return self.cleaned_data["code"]
