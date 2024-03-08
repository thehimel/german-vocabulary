from django import forms
from django.utils.translation import gettext as _
from apps.base.utils.languages import get_language_choices
from apps.base.constants import SELECTED_LANGUAGE, PRIMARY_LANGUAGE


class LanguagePreferencesForm(forms.Form):
    language_choices = get_language_choices()
    selected_language = forms.ChoiceField(choices=language_choices.get(SELECTED_LANGUAGE, None), label=_("Language to learn"))
    primary_language = forms.ChoiceField(choices=language_choices.get(PRIMARY_LANGUAGE, None), label=_("Language you already know"))
