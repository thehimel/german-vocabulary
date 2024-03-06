from django.shortcuts import redirect
from django.views.generic import TemplateView


class HomeView(TemplateView):
    template_name = "base/welcome.html"

    def get(self, request, *args, **kwargs):
        if self.request.user.is_authenticated:
            return redirect("cards:any")
        else:
            return super().get(request, *args, **kwargs)


class MessageView(TemplateView):
    template_name = "base/message.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["title"] = self.request.GET.get("title", "You Got the Following Messages")
        return context
