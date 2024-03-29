from django.apps import AppConfig


class PreviewConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.previews"

    def ready(self):
        import apps.previews.signals
