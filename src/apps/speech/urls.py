from django.urls import path

from apps.speech.views import TextToSpeechAPIView

app_name = "speech"

urlpatterns = [
    path("tts/", TextToSpeechAPIView.as_view(), name="tts"),
]
