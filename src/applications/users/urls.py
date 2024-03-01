from django.urls import path
from applications.users.views import ProfileView


app_name = "users"

urlpatterns = [
    path("profiles/<slug:slug>", ProfileView.as_view(), name="profile"),
]
