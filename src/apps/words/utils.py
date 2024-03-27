from apps.words.constants import LEVELS


def getLevelChoices():
    return [(item, item.upper()) for item in LEVELS]
