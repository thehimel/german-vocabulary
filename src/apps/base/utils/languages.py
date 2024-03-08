from datetime import datetime, timedelta

from django import forms
from django.http import HttpRequest, HttpResponse

from apps.base.constants import PRIMARY_LANGUAGE, SELECTED_LANGUAGE
from apps.base.utils.utils import get_cookie_max_age


def is_languages_selected(request: HttpRequest):
    return request.COOKIES.get(SELECTED_LANGUAGE, None) and request.COOKIES.get(PRIMARY_LANGUAGE, None)


def get_language_preferences(request: HttpRequest):
    return {
        SELECTED_LANGUAGE: request.COOKIES.get(SELECTED_LANGUAGE, None),
        PRIMARY_LANGUAGE: request.COOKIES.get(PRIMARY_LANGUAGE, None),
    }


def set_language_preferences(response: HttpResponse, form: forms.Form):
    max_age = get_cookie_max_age()
    response.set_cookie(key=SELECTED_LANGUAGE, value=form.cleaned_data[SELECTED_LANGUAGE], max_age=max_age)
    response.set_cookie(key=PRIMARY_LANGUAGE, value=form.cleaned_data[PRIMARY_LANGUAGE], max_age=max_age)


def get_language_choices():
    """TODO: Return the present languages in the database."""
    language_choices = [("en", "English"), ("de", "German")]
    return {SELECTED_LANGUAGE: language_choices, PRIMARY_LANGUAGE: language_choices}
