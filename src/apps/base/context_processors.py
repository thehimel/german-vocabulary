from django.http import HttpRequest

from apps.base.constants import BRAND_NAME, IS_LANGUAGES_SELECTED
from apps.base.utils.languages import is_languages_selected


def base_context(request: HttpRequest):
    return {
        "brand_name": BRAND_NAME,
        IS_LANGUAGES_SELECTED: is_languages_selected(request=request),
    }
