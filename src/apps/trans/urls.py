from django.urls import path
from apps.trans.views import TranslateAPIView

app_name = "trans"

urlpatterns = [
    path("", TranslateAPIView.as_view(), name="home"),
]
