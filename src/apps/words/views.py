from django.views.generic import DetailView, ListView

from apps.base.utils.decorators import language_preferences_required
from apps.words.models import Word


# Create your views here.
class WordListView(ListView):
    model = Word
    template_name = "words/list.html"
    context_object_name = "objects"

    @language_preferences_required
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class WordDetailView(DetailView):
    template_name = "words/detail.html"
    model = Word
    context_object_name = "object"
    slug_field = "pk"
