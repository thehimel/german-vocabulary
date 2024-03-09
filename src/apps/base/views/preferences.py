from django.shortcuts import render
from django.views import View

from apps.base.constants import IS_LANGUAGES_SELECTED
from apps.base.utils.languages import get_language_preferences, set_language_preferences


from django import forms
from django.utils.translation import gettext as _

from apps.base.constants import PRIMARY_LANGUAGE, SELECTED_LANGUAGE
from apps.base.utils.languages import get_language_choices


class SelectedLanguageForm(forms.Form):
    language_choices = get_language_choices()
    selected_language = forms.ChoiceField(
        choices=language_choices.get(SELECTED_LANGUAGE, None), label=_("Language to learn"), widget=forms.RadioSelect
    )


class PrimaryLanguageForm(forms.Form):
    language_choices = get_language_choices()
    primary_language = forms.ChoiceField(
        choices=language_choices.get(PRIMARY_LANGUAGE, None), label=_("Language you already know"), widget=forms.RadioSelect
    )


class PreferencesView(View):
    template_name = "base/preferences.html"
    form_class = PrimaryLanguageForm

    def get(self, request, *args, **kwargs):
        initial_data = get_language_preferences(request=request)
        form = self.form_class(initial=initial_data)
        context = {
            "form": form,
            "action_url_name": "base:preferences",
            "title": "Language Preferences",
            "button_color": "btn-success",
            "button_text": "Submit",
        }
        return render(request, self.template_name, context)

    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST)

        if form.is_valid():
            context = {IS_LANGUAGES_SELECTED: True}
            response = render(request, "base/welcome.html", context)
            set_language_preferences(response=response, form=form)
            return response
