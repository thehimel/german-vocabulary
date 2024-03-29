from django.urls import path

from apps.words.views import PropertiesAPIView, WordDetailAPIView, WordListAPIView

app_name = "words"

urlpatterns = [
    path("", WordListAPIView.as_view(), name="list"),
    path("<int:id>/", WordDetailAPIView.as_view(), name="detail"),
    path("properties/", PropertiesAPIView.as_view(), name="properties"),
]
