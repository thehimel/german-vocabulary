from django.http import HttpRequest, HttpResponse
from django import forms
from apps.base.constants import SELECTED_LANGUAGE, PRIMARY_LANGUAGE


def is_languages_selected(request: HttpRequest):
    return request.COOKIES.get(SELECTED_LANGUAGE, None) and request.COOKIES.get(PRIMARY_LANGUAGE, None)


def get_language_preferences(request: HttpRequest):
    return {
        SELECTED_LANGUAGE: request.COOKIES.get(SELECTED_LANGUAGE, None),
        PRIMARY_LANGUAGE: request.COOKIES.get(PRIMARY_LANGUAGE, None),
    }


def set_language_preferences(response: HttpResponse, form: forms.Form):
    response.set_cookie(SELECTED_LANGUAGE, form.cleaned_data[SELECTED_LANGUAGE])
    response.set_cookie(PRIMARY_LANGUAGE, form.cleaned_data[PRIMARY_LANGUAGE])


def get_language_choices():
    """TODO: Return the present languages in the database."""
    language_choices = [("en", "English"), ("de", "German")]
    return {
        SELECTED_LANGUAGE: language_choices,
        PRIMARY_LANGUAGE: language_choices
    }
