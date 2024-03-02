from django.views.generic import TemplateView


class HomeView(TemplateView):
    template_name = "base/index.html"


class MessageView(TemplateView):
    template_name = "base/message.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["title"] = self.request.GET.get("title", "You Got the Following Messages")
        return context
