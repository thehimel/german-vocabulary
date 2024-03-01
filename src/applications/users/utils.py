import os
from utilities.validators import validate_file_size


def profile_picture_directory(instance, filename):
    _, extension = os.path.splitext(filename)
    filename = f"profile_picture{extension}"
    return f"users/{instance.username}/{filename}"


def validate_profile_picture_file_size(value):
    validate_file_size(value, max_limit_in_mb=2)
