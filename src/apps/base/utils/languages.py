from django import forms
from django.conf import settings
from django.http import HttpRequest, HttpResponse
from django.utils.translation import gettext_lazy as _

from apps.base.constants import DEFAULT_PRIMARY_LANGUAGE, LEVEL, PRIMARY_LANGUAGE, SECONDARY_LANGUAGE
from apps.base.utils.cookies import get_cookie_max_age


def get_language_name(code: str):
    for lang_code, lang_name in settings.LANGUAGES:
        if lang_code == code:
            return lang_name
    return None


def get_level(request: HttpRequest):
    return request.COOKIES.get(LEVEL, None)


def set_level(response: HttpResponse, value, max_age: int):
    response.set_cookie(key=LEVEL, value=value, max_age=max_age)


def get_primary_language(request: HttpRequest):
    return DEFAULT_PRIMARY_LANGUAGE or request.COOKIES.get(PRIMARY_LANGUAGE, None)


def set_primary_language(response: HttpResponse, value, max_age: int):
    if not DEFAULT_PRIMARY_LANGUAGE:
        response.set_cookie(key=PRIMARY_LANGUAGE, value=value, max_age=max_age)


def get_secondary_language(request: HttpRequest):
    return request.COOKIES.get(SECONDARY_LANGUAGE, None)


def set_secondary_language(response: HttpResponse, value, max_age: int):
    response.set_cookie(key=SECONDARY_LANGUAGE, value=value, max_age=max_age)


def is_languages_selected(request: HttpRequest):
    return get_primary_language(request=request) and get_secondary_language(request=request)


def get_language_preferences(request: HttpRequest):
    return {
        LEVEL: get_level(request=request),
        PRIMARY_LANGUAGE: get_primary_language(request=request),
        SECONDARY_LANGUAGE: get_secondary_language(request=request),
    }


def set_language_preferences(response: HttpResponse, data: dict):
    max_age = get_cookie_max_age()
    set_level(response=response, value=data.get(LEVEL, None), max_age=max_age)
    set_primary_language(response=response, value=data.get(PRIMARY_LANGUAGE, None), max_age=max_age)
    set_secondary_language(response=response, value=data.get(SECONDARY_LANGUAGE, None), max_age=max_age)


def get_language_choices():
    """TODO: Return from database."""
    language_choices = [("de", _("German")), ("en", _("English")), ("bn", _("Bengali"))]
    primary_language_choices = (
        [(DEFAULT_PRIMARY_LANGUAGE, _(get_language_name(code=DEFAULT_PRIMARY_LANGUAGE)))]
        if DEFAULT_PRIMARY_LANGUAGE
        else language_choices
    )
    secondary_language_choices = [language for language in language_choices if language[0] != DEFAULT_PRIMARY_LANGUAGE]
    return {PRIMARY_LANGUAGE: primary_language_choices, SECONDARY_LANGUAGE: secondary_language_choices}


def get_level_choices():
    """TODO: Return from database."""
    return [("a1", "A1"), ("a2", "A2"), ("b1", "B1"), ("b2", "B2"), ("c1", "C1"), ("C2", "C2")][:2]
