from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import DetailView
from django.contrib.auth import get_user_model


class ProfileView(LoginRequiredMixin, DetailView):
    template_name = "users/profile.html"
    extra_context = {
        "head_title": "Profile",
    }
    model = get_user_model()
    slug_field = "username"
