from django import forms
from django.utils.translation import gettext as _

from apps.base.constants import SECONDARY_LANGUAGE, SELECTED_LANGUAGE
from apps.base.utils.languages import get_language_choices, get_level_choices


class LanguagePreferencesForm(forms.Form):
    language_choices = get_language_choices()
    selected_language = forms.ChoiceField(
        choices=language_choices.get(SELECTED_LANGUAGE, None), label=_("Language to learn")
    )
    secondary_language = forms.ChoiceField(
        choices=language_choices.get(SECONDARY_LANGUAGE, None), label=_("Secondary language")
    )
    level = forms.ChoiceField(choices=get_level_choices(), label=_("Difficulty Level"))
