from django.urls import path

# from apps.trans.views.translate import TranslateAPIView
from apps.trans.views.translate_word import TranslateWordView

app_name = "trans"

urlpatterns = [
    # path("", TranslateAPIView.as_view(), name="home"),
    path("word/", TranslateWordView.as_view(), name="translate_word"),
]
