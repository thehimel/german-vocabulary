# views.py
from django import forms
from django.shortcuts import render
from django.utils.translation import gettext as _
from django.views import View
from apps.base.utils.languages import get_language_preferences, set_language_preferences

LANGUAGE_CHOICES = [("en", "English"), ("de", "German")]


class LanguagePreferencesForm(forms.Form):
    selected_language = forms.ChoiceField(choices=LANGUAGE_CHOICES, label=_("Language to learn"))
    primary_language = forms.ChoiceField(choices=LANGUAGE_CHOICES, label=_("Language you already know"))


class LanguagePreferencesView(View):
    template_name = "base/components/update.html"
    form_class = LanguagePreferencesForm

    def get(self, request, *args, **kwargs):
        initial_data = get_language_preferences(request=request)
        form = self.form_class(initial=initial_data)
        context = {
            "form": form,
            "action_url_name": "base:language_preferences",
            "title": "Language Preferences",
            "button_color": "btn-success",
            "button_text": "Submit",
        }
        return render(request, self.template_name, context)

    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST)

        if form.is_valid():
            response = render(request, "base/welcome.html")
            set_language_preferences(response=response, form=form)
            return response
