from django.urls import path

from apps.cards.views import HomeView, CardDetailView, NextCardView

app_name = "cards"

urlpatterns = [
    path("any/", NextCardView.as_view(), {'action': 'any'}, name="any"),
    path('next/<slug:slug>/', NextCardView.as_view(), {'action': 'next'}, name='next'),
    path('previous/<slug:slug>/', NextCardView.as_view(), {'action': 'previous'}, name='previous'),
    path("", HomeView.as_view(), name="home"),
    path("<slug:slug>/", CardDetailView.as_view(), name="detail"),

]
