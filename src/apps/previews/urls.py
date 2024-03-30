from django.urls import path

from apps.previews.views import PreviewListAPIView

app_name = "preview"

urlpatterns = [
    path("", PreviewListAPIView.as_view(), name="list"),
]
