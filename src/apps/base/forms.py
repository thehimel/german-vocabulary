from django import forms
from django.utils.translation import gettext as _

from apps.base.constants import PRIMARY_LANGUAGE, SELECTED_LANGUAGE
from apps.base.utils.languages import get_language_choices


class LanguagePreferencesForm(forms.Form):
    language_choices = get_language_choices()
    selected_language = forms.ChoiceField(
        choices=language_choices.get(SELECTED_LANGUAGE, None), label=_("Language to learn")
    )
    primary_language = forms.ChoiceField(
        choices=language_choices.get(PRIMARY_LANGUAGE, None), label=_("Language you already know")
    )
