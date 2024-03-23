from django.urls import include, path

from apps.api.views import HomeAPIView
from apps.speech.views import TextToSpeechAPIView
from apps.trans.views import TranslateAPIView

app_name = "api"

urlpatterns = [
    path("", HomeAPIView.as_view(), name="home"),
    path("words/", include("apps.words.urls", namespace="words")),
    path("translate/", TranslateAPIView.as_view(), name="translate"),
    path("text-to-speech/", TextToSpeechAPIView.as_view(), name="text-to-speech"),
]
