from decouple import config

LEVEL = "level"
PRIMARY_LANGUAGE = "primary_language"
SECONDARY_LANGUAGE = "secondary_language"
IS_LANGUAGES_SELECTED = "is_languages_selected"
COOKIES_MAX_AGE_IN_DAYS = config("COOKIES_MAX_AGE_IN_DAYS", cast=int, default=1)
DEFAULT_PRIMARY_LANGUAGE = config("DEFAULT_PRIMARY_LANGUAGE", default=None)
