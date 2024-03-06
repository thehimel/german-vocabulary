from django.urls import path

from apps.base.views.base import HomeView, MessageView

app_name = "base"

urlpatterns = [
    path("", HomeView.as_view(), name="home"),
    path("messages/", MessageView.as_view(), name="messages"),
]
