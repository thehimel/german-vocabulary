import re


def remove_special_characters(text: str):
    # Using a regular expression to keep only alphanumeric characters.
    return re.sub(r"[^a-zA-Z0-9]", "", text)
