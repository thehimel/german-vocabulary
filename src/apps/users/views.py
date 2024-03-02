from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import DetailView, UpdateView
from django.contrib.auth import get_user_model
from apps.users.constants import APP_NAME
from apps.users.mixins import UserIsOwnerMixin


class ProfileView(LoginRequiredMixin, DetailView):
    template_name = f"{APP_NAME}/profile.html"
    model = get_user_model()
    slug_field = "username"


class ProfileUpdateView(UserIsOwnerMixin, UpdateView):
    """UpdateView for the user profile."""

    template_name = "users/profile_update.html"
    model = get_user_model()
    fields = ["first_name", "last_name", "gender"]
    slug_field = "username"
