import os

from apps.base.utils.validators import validate_file_size


def user_directory_path(instance, filename):
    _, extension = os.path.splitext(filename)
    filename = f"picture{extension}"
    return f"users/{instance.username}/profile/{filename}"


def validate_profile_picture_file_size(value):
    validate_file_size(value, max_limit_in_mb=2)
