from django.views.generic import TemplateView


class ClientView(TemplateView):
    template_name = "index.html"
