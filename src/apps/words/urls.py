from django.urls import path

from apps.words.views import WordDetailView, WordListView, WordListAPIView

app_name = "words"

urlpatterns = [
    path("", WordListView.as_view(), name="list"),
    path("api/", WordListAPIView.as_view(), name="api_list"),
    path("<slug:slug>/", WordDetailView.as_view(), name="detail"),
]
