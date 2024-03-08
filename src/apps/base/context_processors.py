from django.http import HttpRequest
from apps.base.constants import IS_LANGUAGE_SELECTED
from apps.base.utils.languages import is_languages_selected


def base_context(request: HttpRequest):
    return {
        'brand_name': 'German Vocabulary',
        IS_LANGUAGE_SELECTED: is_languages_selected(request=request),
    }
