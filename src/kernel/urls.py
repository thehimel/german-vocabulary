from django.urls import path

from kernel.views import HomeView

app_name = "kernel"

urlpatterns = [
    path("", HomeView.as_view(), name="home"),
]
