from apps.base.utils.utils import get_timestamp_from_time_delta
from apps.base.constants import COOKIES_MAX_AGE_IN_DAYS


def get_cookie_max_age():
    return get_timestamp_from_time_delta(days=COOKIES_MAX_AGE_IN_DAYS)
