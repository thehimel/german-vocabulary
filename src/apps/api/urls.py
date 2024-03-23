from django.urls import include, path

from apps.api.views import HomeAPIView
from apps.speech.views import TextToSpeechAPIView
from apps.trans.views import TranslateAPIView

app_name = "api"

urlpatterns = [
    path("", HomeAPIView.as_view(), name="home"),
    path("words/", include("apps.words.urls", namespace="words")),
    path("translate/", include("apps.trans.urls", namespace="trans")),
    path("text-to-speech/", include("apps.speech.urls", namespace="speech")),
]
