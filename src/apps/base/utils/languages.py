from django.http import HttpRequest
from apps.base.constants import SELECTED_LANGUAGE, PRIMARY_LANGUAGE


def is_languages_selected(request: HttpRequest):
    return request.COOKIES.get(SELECTED_LANGUAGE, None) and request.COOKIES.get(PRIMARY_LANGUAGE, None)


def get_language_preferences(request: HttpRequest):
    return {
        SELECTED_LANGUAGE: request.COOKIES.get(SELECTED_LANGUAGE, None),
        PRIMARY_LANGUAGE: request.COOKIES.get(PRIMARY_LANGUAGE, None),
    }
