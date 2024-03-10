from django.views.generic import DetailView, ListView

from apps.base.utils.decorators import language_preferences_required
from apps.base.utils.languages import get_selected_language, get_language_level
from apps.words.models import Word


# Create your views here.
class WordListView(ListView):
    """TODO: Return to a page, if no word is found with this language preference."""
    model = Word
    template_name = "words/list.html"
    context_object_name = "objects"

    @language_preferences_required
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def get_queryset(self):
        language = get_selected_language(request=self.request)
        level = get_language_level(request=self.request)
        queryset = Word.objects.filter(language__title=language, level=level)
        return queryset


class WordDetailView(DetailView):
    template_name = "words/detail.html"
    model = Word
    context_object_name = "object"
    slug_field = "pk"
