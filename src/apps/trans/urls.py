from django.urls import path

from apps.trans.views import TranslateAPIView, TranslateWordView

app_name = "trans"

urlpatterns = [
    path("", TranslateAPIView.as_view(), name="home"),
    path("word/", TranslateWordView.as_view(), name="translate_word"),
]
