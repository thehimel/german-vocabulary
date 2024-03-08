from apps.base.utils.utils import get_timestamp_from_time_delta
from apps.base.constants import COOKIE_EXPIRATION_DAYS


def get_cookie_max_age():
    return get_timestamp_from_time_delta(days=COOKIE_EXPIRATION_DAYS)
