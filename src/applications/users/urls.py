from django.urls import path
from applications.users.views import ProfileView, ProfileUpdateView


app_name = "users"

urlpatterns = [
    path("<slug:slug>", ProfileView.as_view(), name="profile"),
    path("update/<slug:slug>", ProfileUpdateView.as_view(), name="profile_update"),
]
