from django import forms
from crispy_forms.helper import FormHelper
from django.shortcuts import render
from formtools.wizard.views import SessionWizardView


class PageOneForm(forms.Form):
    field_one = forms.CharField()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_tag = False


class PageTwoForm(forms.Form):
    field_two = forms.CharField()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_tag = False


class MyFormWizard(SessionWizardView):
    form_list = [PageOneForm, PageTwoForm]
    template_name = 'base/multi_page_form/form.html'

    def done(self, form_list, **kwargs):
        data = {}
        for form in form_list:
            data.update(form.cleaned_data)

        response = render(self.request, 'base/multi_page_form/done.html', {'form_data': data})
        for key, value in data.items():
            response.set_cookie(key, value)

        return response
