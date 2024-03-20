from django.urls import path

from apps.api.views import HomeAPIView
from apps.words.views import WordListAPIView

app_name = "api"

urlpatterns = [
    path("", HomeAPIView.as_view(), name="home"),
    path("words/", WordListAPIView.as_view(), name="words"),
]
