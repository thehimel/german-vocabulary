from django.contrib import messages
from django.shortcuts import redirect
from django.contrib.auth.mixins import LoginRequiredMixin
from core.constants import UNAUTHORIZED_TEXT


class UserIsOwnerMixin(LoginRequiredMixin):
    def dispatch(self, request, *args, **kwargs):
        obj = self.get_object()
        if obj.username == request.user.username:
            return super().dispatch(request, *args, **kwargs)
        else:
            messages.warning(request, UNAUTHORIZED_TEXT)
            return redirect(request.META.get("HTTP_REFERER", "/"))
