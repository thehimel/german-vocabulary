from django.http import HttpRequest

from apps.base.constants import IS_LANGUAGES_SELECTED
from apps.base.utils.languages import is_languages_selected


def base_context(request: HttpRequest):
    return {
        "brand_name": "German Vocabulary",
        IS_LANGUAGES_SELECTED: is_languages_selected(request=request),
    }
