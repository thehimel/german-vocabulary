from django import forms
from crispy_forms.helper import FormHelper
from django.shortcuts import render
from formtools.wizard.views import SessionWizardView


class PageOneForm(forms.Form):
    firstname = forms.CharField()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_tag = False


class PageTwoForm(forms.Form):
    lastname = forms.CharField()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_tag = False


class PageThreeForm(forms.Form):
    email = forms.CharField()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_tag = False


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
