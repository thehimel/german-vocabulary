from django.urls import path

from apps.api.views import HomeAPIView

app_name = "api"

urlpatterns = [
    path("", HomeAPIView.as_view(), name="home"),
]
