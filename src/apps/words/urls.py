from django.urls import path

from apps.words.views import WordDetailView, WordListView

app_name = "words"

urlpatterns = [
    path("", WordListView.as_view(), name="list"),
    path("<slug:slug>/", WordDetailView.as_view(), name="detail"),
]
