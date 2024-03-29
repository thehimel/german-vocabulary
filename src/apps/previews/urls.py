from django.urls import path
from apps.previews.views import PreBundleListAPIView

app_name = "preview"

urlpatterns = [
    path("", PreBundleListAPIView.as_view(), name="list"),
]
