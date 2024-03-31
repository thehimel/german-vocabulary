from django.urls import include, path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

app_name = "api"

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("words/", include("apps.words.urls", namespace="words")),
    path("previews/", include("apps.previews.urls", namespace="previews")),
    path("translate/", include("apps.trans.urls", namespace="trans")),
    path("text-to-speech/", include("apps.speech.urls", namespace="speech")),
]
