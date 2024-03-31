from django.apps import AppConfig


class WordsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.words"

    def ready(self):
        from django.core.management import load_command_class

        load_command_class("apps.words", "update_words")
