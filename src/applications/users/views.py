from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import DetailView
from applications.users.models import User


class ProfileView(LoginRequiredMixin, DetailView):
    template_name = "users/profile.html"
    extra_context = {
        "head_title": "Profile",
    }
    model = User
    slug_field = "username"
