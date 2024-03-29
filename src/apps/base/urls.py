from django.urls import path

from apps.base.views.base import HomeView, MessageView
from apps.base.views.client import ClientView
from apps.base.views.get_started import GetStartedWizard
from apps.base.views.languages import LanguagePreferencesView

app_name = "base"

urlpatterns = [
    path("", ClientView.as_view(), name="client"),
    path("add/", ClientView.as_view(), name="client"),
    path("add/<int:index>", ClientView.as_view(), name="client"),
    path("home/", HomeView.as_view(), name="home"),
    path("messages/", MessageView.as_view(), name="messages"),
    path("language-preferences/", LanguagePreferencesView.as_view(), name="language_preferences"),
    path("get-started/", GetStartedWizard.as_view(), name="get_started"),
]
