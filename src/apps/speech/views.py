from io import BytesIO

from django.http import FileResponse
from gtts import gTTS
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


class TextToSpeechAPIView(APIView):
    @staticmethod
    def get(request, *args, **kwargs):
        input_text = request.query_params.get("text", "")
        language = request.query_params.get("language", "en")

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
