from django.urls import path

from apps.api.views import HomeAPIView
from apps.words.views import WordListAPIView, WordDetailAPIView
from apps.speech.views import TextToSpeechAPIView
from apps.trans.views import TranslateAPIView

app_name = "api"

urlpatterns = [
    path("", HomeAPIView.as_view(), name="home"),
    path("words/", WordListAPIView.as_view(), name="words"),
    path("words/<int:id>/", WordDetailAPIView.as_view(), name="words_detail"),
    path("translate/", TranslateAPIView.as_view(), name="translate"),
    path("text-to-speech/", TextToSpeechAPIView.as_view(), name="text-to-speech"),
]
