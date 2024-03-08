# views.py
from django import forms
from django.shortcuts import render
from django.utils.translation import gettext as _
from django.views import View

LANGUAGE_CHOICES = [("en", "English"), ("de", "German")]


class LanguagePreferencesForm(forms.Form):
    selected_language = forms.ChoiceField(choices=LANGUAGE_CHOICES, label=_("Language to learn"))
    primary_language = forms.ChoiceField(
        choices=LANGUAGE_CHOICES, label=_("Language you already know")
    )


class LanguagePreferencesView(View):
    template_name = "base/languages/preferences.html"
    form_class = LanguagePreferencesForm

    def get(self, request, *args, **kwargs):
        cookies = request.COOKIES
        initial_data = {
            "selected_language": cookies.get("selected_language", None),
            "primary_language": cookies.get("primary_language", None),
        }
        form = self.form_class(initial=initial_data)
        return render(request, self.template_name, {"form": form})

    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST)

        if form.is_valid():
            selected_language = form.cleaned_data["selected_language"]
            primary_language = form.cleaned_data["primary_language"]
            response = render(request, "base/welcome.html")

            # Set cookies for selected language and primary language
            response.set_cookie("selected_language", selected_language)
            response.set_cookie("primary_language", primary_language)

            return response
