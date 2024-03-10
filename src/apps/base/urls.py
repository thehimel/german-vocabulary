from django.urls import path

from apps.base.views.base import HomeView, MessageView
from apps.base.views.languages import LanguagePreferencesView
from apps.base.views.get_started import GetStartedWizard

app_name = "base"

urlpatterns = [
    path("", HomeView.as_view(), name="home"),
    path("messages/", MessageView.as_view(), name="messages"),
    path("language-preferences/", LanguagePreferencesView.as_view(), name="language_preferences"),
    path("get-started/", GetStartedWizard.as_view(), name="get_started"),
]
