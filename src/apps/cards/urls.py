from django.urls import path

from apps.cards.views import HomeView

app_name = "cards"

urlpatterns = [
    path("", HomeView.as_view(), name="home"),
]
