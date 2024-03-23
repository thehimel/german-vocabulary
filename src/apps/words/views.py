from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from apps.words.models import Word
from apps.words.serializers import WordListSerializer, WordSerializer


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
