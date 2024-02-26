from django.urls import path

from applications.base.views import HomeView

app_name = "base"

urlpatterns = [
    path("", HomeView.as_view(), name="home"),
]
