from drf_yasg.utils import swagger_auto_schema

from apps.api.utils import serializer_to_manual_parameters
from apps.previews.models import PreBundle
from apps.previews.serializers import PreBundleListSerializer
from apps.words.serializers import WordListQueryParamsSerializer
from apps.words.views import BaseWordListAPIView


class PreBundleListAPIView(BaseWordListAPIView):
    model = PreBundle
    serializer_class = PreBundleListSerializer
    query_params_serializer_class = WordListQueryParamsSerializer

    @swagger_auto_schema(manual_parameters=serializer_to_manual_parameters(query_params_serializer_class))
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
