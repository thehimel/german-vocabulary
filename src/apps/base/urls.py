from django.urls import path

from apps.base.views.base import HomeView, MessageView
from apps.base.views.languages import LanguagePreferencesView
from apps.base.views.preferences import PreferencesView

app_name = "base"

urlpatterns = [
    path("", HomeView.as_view(), name="home"),
    path("messages/", MessageView.as_view(), name="messages"),
    path("language-preferences/", LanguagePreferencesView.as_view(), name="language_preferences"),
    path("preferences/", PreferencesView.as_view(), name="preferences"),
]
