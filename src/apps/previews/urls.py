from django.urls import path

from apps.previews.views import PreviewListAPIView, PreWordCreateView

app_name = "preview"

urlpatterns = [
    path("", PreviewListAPIView.as_view(), name="list"),
    path("words/create/", PreWordCreateView.as_view(), name="create"),
]
