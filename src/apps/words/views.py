from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator
from django.db.models.functions import Lower
from django.views.generic import DetailView, ListView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response

from apps.base.utils.decorators import language_preferences_required
from apps.base.utils.languages import get_level, get_primary_language
from apps.words.models import Word
from apps.words.serializers import WordListSerializer, WordSerializer


# Create your views here.
class WordListView(ListView):
    """TODO: Return to a page, if no word is found with this language preference."""

    model = Word
    template_name = "words/list.html"
    context_object_name = "objects"
    paginate_by = 8

    @language_preferences_required
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def get_queryset(self):
        queryset = super().get_queryset()
        language = get_primary_language(request=self.request)
        level = get_level(request=self.request)

        search_query = self.request.GET.get("q")
        if search_query:
            queryset = queryset.filter(
                title__icontains=search_query, language__code=language, level=level, hidden=False
            ).order_by(Lower("title"))
        else:
            queryset = Word.objects.filter(language__code=language, level=level, hidden=False).order_by(Lower("title"))
        return queryset

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        paginator = Paginator(context["object_list"], self.paginate_by)
        page = self.request.GET.get("page")
        try:
            objects = paginator.page(page)
        except PageNotAnInteger:
            # If page is not an integer, deliver first page.
            objects = paginator.page(1)
        except EmptyPage:
            # If page is out of range (e.g. 9999), deliver last page of results.
            objects = paginator.page(paginator.num_pages)
        context["objects"] = objects
        return context


class WordDetailView(DetailView):
    template_name = "words/detail.html"
    model = Word
    context_object_name = "object"
    slug_field = "pk"


class WordListAPIView(ListAPIView):
    serializer_class = WordListSerializer

    def get_queryset(self):
        primary_language = self.request.query_params.get("primary_language", "de")
        level = self.request.query_params.get("level", "a1")
        search_query = self.request.query_params.get("q", None)
        queryset = Word.objects.filter(hidden=False, language__code=primary_language, level=level).order_by("title")
        if search_query:
            queryset = queryset.filter(title__icontains=search_query)
        return queryset


class WordDetailAPIView(RetrieveAPIView):
    serializer_class = WordSerializer
    queryset = Word.objects.all()
    lookup_field = 'id'

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()

        serializer_context = {'request': request}
        secondary_language = request.query_params.get('secondary_language')
        if secondary_language:
            serializer_context['secondary_language'] = secondary_language

        serializer = self.get_serializer(instance, context=serializer_context)
        data = serializer.data

        return Response(data)
