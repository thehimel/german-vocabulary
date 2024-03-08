from django.views.generic import TemplateView
from apps.base.utils.decorators import add_language_selected_context


@add_language_selected_context
class HomeView(TemplateView):
    template_name = "base/welcome.html"


class MessageView(TemplateView):
    template_name = "base/message.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["title"] = self.request.GET.get("title", "You Got the Following Messages")
        return context
