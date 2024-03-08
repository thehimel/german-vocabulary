from django.shortcuts import render
from django.views import View
from apps.base.utils.languages import get_language_preferences, set_language_preferences
from apps.base.forms import LanguagePreferencesForm
from apps.base.constants import IS_LANGUAGE_SELECTED


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
            context = {IS_LANGUAGE_SELECTED: True}
            response = render(request, "base/welcome.html", context)
            set_language_preferences(response=response, form=form)
            return response
