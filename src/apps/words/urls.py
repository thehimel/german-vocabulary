from django.urls import path

from apps.words.views import WordListView, WordDetailView

app_name = "words"

urlpatterns = [
    path("", WordListView.as_view(), name="list"),
    path("<slug:slug>/", WordDetailView.as_view(), name="detail"),
]
