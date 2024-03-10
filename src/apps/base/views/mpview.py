from django import forms
from django.shortcuts import render
from formtools.wizard.views import SessionWizardView
from django.utils.translation import gettext as _

from apps.base.utils.decorators import form_helper
from apps.base.constants import PRIMARY_LANGUAGE, SELECTED_LANGUAGE
from apps.base.utils.languages import get_language_choices, get_level_choices


@form_helper
class PageOneForm(forms.Form):
    selected_language = forms.ChoiceField(
        choices=get_language_choices().get(SELECTED_LANGUAGE, None), label=_("Language to learn")
    )


@form_helper
class PageTwoForm(forms.Form):
    primary_language = forms.ChoiceField(
        choices=get_language_choices().get(PRIMARY_LANGUAGE, None), label=_("Secondary language")
    )


@form_helper
class PageThreeForm(forms.Form):
    level = forms.ChoiceField(choices=get_level_choices(), label=_("Difficulty Level"))


class MyFormWizard(SessionWizardView):
    form_list = [PageOneForm, PageTwoForm, PageThreeForm]
    template_name = "base/multi_page_form/form.html"

    def get_context_data(self, form, **kwargs):
        context = super().get_context_data(form=form, **kwargs)
        all_data = {}
        for step in self.get_form_list():
            cleaned_data = self.get_cleaned_data_for_step(step) or {}
            all_data.update(cleaned_data)
        context["all_data"] = all_data
        return context

    def done(self, form_list, **kwargs):
        data = {}
        for form in form_list:
            data.update(form.cleaned_data)

        response = render(self.request, "base/welcome.html", {"form_data": data})
        for key, value in data.items():
            response.set_cookie(key, value)

        return response
