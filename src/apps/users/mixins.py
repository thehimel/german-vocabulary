from django.urls import reverse
from django.contrib import messages
from django.shortcuts import redirect
from django.contrib.auth.mixins import LoginRequiredMixin
from core.constants import UNAUTHORIZED_MESSAGE, HTTP_401_UNAUTHORIZED


class UserIsOwnerMixin(LoginRequiredMixin):
    def dispatch(self, request, *args, **kwargs):
        obj = self.get_object()
        if obj.username == request.user.username:
            return super().dispatch(request, *args, **kwargs)
        else:
            messages.warning(request, UNAUTHORIZED_MESSAGE)
            redirected_url = reverse("base:messages") + f"?title={HTTP_401_UNAUTHORIZED}"
            return redirect(redirected_url)
