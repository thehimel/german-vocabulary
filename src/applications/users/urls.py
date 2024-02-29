from django.urls import path
from applications.users.views import UserSignupView

app_name = "users"

urlpatterns = [
    path("signup/", UserSignupView.as_view(), name="signup"),
]
