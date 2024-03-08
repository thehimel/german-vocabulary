import re
from datetime import datetime, timedelta

from apps.base.constants import COOKIE_EXPIRATION_DAYS


def remove_special_characters(text: str):
    # Using a regular expression to keep only alphanumeric characters.
    return re.sub(r"[^a-zA-Z0-9]", "", text)


def get_timestamp_from_time_delta(days: int = 30):
    expiration_time = datetime.now() + timedelta(days=days)
    return int(expiration_time.timestamp())


def get_cookie_max_age():
    return get_timestamp_from_time_delta(days=COOKIE_EXPIRATION_DAYS)
