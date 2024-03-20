from django.urls import path

from apps.api.views import HomeAPIView
from apps.words.views import WordListAPIView
from apps.speech.views import TextToSpeechAPIView
from apps.trans.views import TranslateAPIView

app_name = "api"

urlpatterns = [
    path("", HomeAPIView.as_view(), name="home"),
    path("words/", WordListAPIView.as_view(), name="words"),
    path("tts/", TextToSpeechAPIView.as_view(), name="speech"),
    path("translate/", TranslateAPIView.as_view(), name="trans"),
]
