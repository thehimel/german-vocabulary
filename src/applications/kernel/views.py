from django.views.generic import TemplateView


class HomeView(TemplateView):
    template_name = f"kernel/home.html"
