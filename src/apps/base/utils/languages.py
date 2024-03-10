from django import forms
from django.http import HttpRequest, HttpResponse

from apps.base.constants import SELECTED_LANGUAGE, PRIMARY_LANGUAGE, LEVEL
from apps.base.utils.cookies import get_cookie_max_age


def is_languages_selected(request: HttpRequest):
    return request.COOKIES.get(SELECTED_LANGUAGE, None) and request.COOKIES.get(PRIMARY_LANGUAGE, None)


def get_language_preferences(request: HttpRequest):
    fields = [LEVEL, SELECTED_LANGUAGE, PRIMARY_LANGUAGE]
    preferences = dict()
    for field in fields:
        preferences[field] = request.COOKIES.get(field, None)
    return preferences


def get_selected_language(request: HttpRequest):
    return get_language_preferences(request=request).get(SELECTED_LANGUAGE, None)


def get_primary_language(request: HttpRequest):
    return get_language_preferences(request=request).get(PRIMARY_LANGUAGE, None)


def set_language_preferences(response: HttpResponse, form: forms.Form):
    max_age = get_cookie_max_age()
    cleaned_data = form.cleaned_data
    for key, value in cleaned_data.items():
        response.set_cookie(key=key, value=value, max_age=max_age)


def get_language_choices():
    """TODO: Return from database."""
    language_choices = [("de", "German"), ("en", "English"), ("bn", "Bengali")]
    return {SELECTED_LANGUAGE: language_choices, PRIMARY_LANGUAGE: language_choices}


def get_level_choices():
    """TODO: Return from database."""
    return [("a1", "A1"), ("a2", "A2"), ("b1", "B1"), ("b2", "B2"), ("c1", "C1"), ("C2", "C2")]
