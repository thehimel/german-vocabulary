from src.apps.base.constants import MEDIA_DIR


def get_media_path(file_path: str) -> str:
    return f"{MEDIA_DIR}/{file_path.strip('/')}"


print(get_media_path(file_path="hello"))
