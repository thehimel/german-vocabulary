from io import BytesIO

from django.http import FileResponse
from drf_yasg.utils import swagger_auto_schema
from gtts import gTTS
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.api.utils import serializer_to_manual_parameters
from apps.speech.serializers import TextToSpeechSerializer


class TextToSpeechAPIView(APIView):
    @swagger_auto_schema(manual_parameters=serializer_to_manual_parameters(TextToSpeechSerializer))
    def get(self, request, *args, **kwargs):
        serializer = TextToSpeechSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        input_text = serializer.validated_data.get("text", "")
        language = serializer.validated_data.get("language", "en")

        if not input_text:
            return Response({"error": "The text parameter is missing."}, status=status.HTTP_400_BAD_REQUEST)

        slow = False if language == "bn" else True

        try:
            tts = gTTS(text=input_text, lang=language, slow=slow)

            output_file = BytesIO()
            tts.write_to_fp(output_file)
            output_file.seek(0)

            response = FileResponse(output_file, content_type="audio/mpeg")
            response["Content-Disposition"] = 'attachment; filename="output.mp3"'
            return response
        except Exception as e:
            return Response(
                {"error": f"Error generating audio: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
