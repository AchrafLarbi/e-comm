from django.apps import AppConfig


class BaseConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "base"
    def ready(self,):
        """
        this method is called when the app is ready
        this is the best place to import signals
        """
        import base.signals
