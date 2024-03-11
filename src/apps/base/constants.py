from decouple import config

LEVEL = "level"
SELECTED_LANGUAGE = "selected_language"
SECONDARY_LANGUAGE = "secondary_language"
IS_LANGUAGES_SELECTED = "is_languages_selected"
COOKIES_MAX_AGE_IN_DAYS = config("COOKIES_MAX_AGE_IN_DAYS", default=1)
DEFAULT_SELECTED_LANGUAGE = config("DEFAULT_SELECTED_LANGUAGE", default=None)
