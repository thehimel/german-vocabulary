from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.api.utils import serializer_to_manual_parameters
from apps.trans.serializers import TranslateSerializer
from apps.trans.utils import translator


class TranslateAPIView(APIView):
    @swagger_auto_schema(manual_parameters=serializer_to_manual_parameters(TranslateSerializer))
    def get(self, request):
        serializer = TranslateSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        text = serializer.validated_data["text"]
        src = serializer.validated_data.get("source_language_code")
        dest = serializer.validated_data.get("target_language_code")

        if not text:
            return Response({"error": "The text parameter is missing."}, status=status.HTTP_400_BAD_REQUEST)

        translation = translator.translate(text=text, src=src, dest=dest)
        return Response({"text": translation})
