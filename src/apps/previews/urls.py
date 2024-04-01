from django.urls import path

from apps.previews.views import PreviewListAPIView, PreviewCreateOrUpdateAPIView, PreWordCreateView

app_name = "preview"

urlpatterns = [
    path("", PreviewListAPIView.as_view(), name="previews"),
    path("create/", PreviewCreateOrUpdateAPIView.as_view(), name="create_preview"),
    path("update/<int:pk>/", PreviewCreateOrUpdateAPIView.as_view(), name="update_preview"),
    path("words/create/", PreWordCreateView.as_view(), name="create_word"),
]
