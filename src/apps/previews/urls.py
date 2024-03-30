from django.urls import path

from apps.previews.views import PreviewListAPIView, PreviewUpdateAPIView, PreWordCreateView

app_name = "preview"

urlpatterns = [
    path("", PreviewListAPIView.as_view(), name="previews"),
    path("update/<int:pk>/", PreviewUpdateAPIView.as_view(), name="update_preview"),
    path("words/create/", PreWordCreateView.as_view(), name="create_word"),
]
