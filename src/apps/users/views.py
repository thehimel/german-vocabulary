from django.contrib.auth import get_user_model
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import DetailView, UpdateView

from apps.users.constants import APP_NAME
from apps.users.mixins import UserIsOwnerMixin


class ProfileView(LoginRequiredMixin, DetailView):
    template_name = f"{APP_NAME}/profile.html"
    model = get_user_model()
    slug_field = "username"


class ProfileUpdateView(UserIsOwnerMixin, UpdateView):
    template_name = "base/components/update.html"
    model = get_user_model()
    fields = ["first_name", "last_name", "gender"]
    slug_field = "username"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context.update({
            "action_url_name": "users:profile_update",
            "title": "Update Profile",
            "button_color": "btn-success",
            "button_text": "Update",
        })
        return context
