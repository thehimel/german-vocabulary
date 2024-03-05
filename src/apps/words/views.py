from django.views.generic import ListView
from apps.words.models import Word


# Create your views here.
class WordListView(ListView):
    model = Word
    template_name = 'words/index.html'
    context_object_name = 'object_list'
