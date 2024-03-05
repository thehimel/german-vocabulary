from django.views.generic import TemplateView, DetailView
from apps.words.models import Word


class HomeView(TemplateView):
    template_name = "cards/index.html"


class CardDetailView(DetailView):
    template_name = "cards/detail.html"
    model = Word
    context_object_name = 'object'
    slug_field = "pk"
