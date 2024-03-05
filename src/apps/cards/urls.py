from django.urls import path

from apps.cards.views import HomeView, CardDetailView

app_name = "cards"

urlpatterns = [
    path("", HomeView.as_view(), name="home"),
    path("<slug:slug>/", CardDetailView.as_view(), name="detail"),
]
