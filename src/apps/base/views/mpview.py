from django import forms
from formtools.wizard.views import SessionWizardView
from django.shortcuts import render
from apps.base.utils.decorators import form_helper


@form_helper
class PageOneForm(forms.Form):
    firstname = forms.CharField()


@form_helper
class PageTwoForm(forms.Form):
    lastname = forms.CharField()


@form_helper
class PageThreeForm(forms.Form):
    email = forms.CharField()


class MyFormWizard(SessionWizardView):
    form_list = [PageOneForm, PageTwoForm, PageThreeForm]
    template_name = 'base/multi_page_form/form.html'

    def get_context_data(self, form, **kwargs):
        context = super().get_context_data(form=form, **kwargs)
        all_data = {}
        for step in self.get_form_list():
            cleaned_data = self.get_cleaned_data_for_step(step) or {}
            all_data.update(cleaned_data)
        context['all_data'] = all_data
        return context

    def done(self, form_list, **kwargs):
        data = {}
        for form in form_list:
            data.update(form.cleaned_data)

        response = render(self.request, 'base/welcome.html', {'form_data': data})
        for key, value in data.items():
            response.set_cookie(key, value)

        return response
