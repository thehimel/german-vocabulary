from django.views.generic import DetailView, ListView

from apps.words.models import Word


# Create your views here.
class WordListView(ListView):
    model = Word
    template_name = "words/list.html"
    context_object_name = "objects"


class WordDetailView(DetailView):
    template_name = "words/detail.html"
    model = Word
    context_object_name = "object"
    slug_field = "pk"
