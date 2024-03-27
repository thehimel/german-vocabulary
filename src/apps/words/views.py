from drf_yasg.utils import swagger_auto_schema
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from apps.api.utils import serializer_to_manual_parameters
from apps.words.models import Word, Language
from apps.words.serializers import WordListQueryParamsSerializer, WordListSerializer, WordSerializer, LanguageSerializer


class WordListAPIView(ListAPIView):
    serializer_class = WordListSerializer

    def get_queryset(self):
        params_serializer = WordListQueryParamsSerializer(data=self.request.query_params)
        params_serializer.is_valid(raise_exception=True)

        primary_language = params_serializer.validated_data.get("primary_language", "de")
        level = params_serializer.validated_data.get("level", "a1")
        search_query = params_serializer.validated_data.get("q", "")

        queryset = Word.objects.filter(hidden=False, language__code=primary_language, level=level).order_by("title")
        if search_query:
            queryset = queryset.filter(title__icontains=search_query)

        return queryset

    @swagger_auto_schema(manual_parameters=serializer_to_manual_parameters(WordListQueryParamsSerializer))
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class WordDetailAPIView(RetrieveAPIView):
    serializer_class = WordSerializer
    queryset = Word.objects.all()
    lookup_field = "id"


class PropertiesAPIView(ListAPIView):
    serializer_class = LanguageSerializer

    def get_queryset(self):
        # Assuming you want to return Language objects
        return Language.objects.all()

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
