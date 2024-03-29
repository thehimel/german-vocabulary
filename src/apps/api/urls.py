from django.urls import include, path

app_name = "api"

urlpatterns = [
    path("words/", include("apps.words.urls", namespace="words")),
    path("previews/", include("apps.previews.urls", namespace="previews")),
    path("translate/", include("apps.trans.urls", namespace="trans")),
    path("text-to-speech/", include("apps.speech.urls", namespace="speech")),
]
