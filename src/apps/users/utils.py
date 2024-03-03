import os


def user_directory_path(instance, filename):
    _, extension = os.path.splitext(filename)
    filename = f"picture{extension}"
    return f"users/{instance.username}/profile/{filename}"
