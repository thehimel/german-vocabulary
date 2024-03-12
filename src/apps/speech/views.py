import os

from django.conf import settings
from django.http import FileResponse
from gtts import gTTS
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


class TextToSpeechAPIView(APIView):
    @staticmethod
    def post(self, request, *args, **kwargs):
        input_text = request.data.get("text", "")
        language_code = request.data.get("language_code", "en")

        if not input_text:
            return Response({"error": "Text parameter is missing"}, status=status.HTTP_400_BAD_REQUEST)

        output_file_path = None

        try:
            tts = gTTS(text=input_text, lang=language_code, slow=False)

            media_root = settings.MEDIA_ROOT
            output_file_path = os.path.join(media_root, "output.mp3")

            tts.save(output_file_path)

            response = FileResponse(open(output_file_path, "rb"), content_type="audio/mpeg")
            response["Content-Disposition"] = 'attachment; filename="output.mp3"'
            return response
        except Exception as e:
            return Response(
                {"error": f"Error generating audio: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        finally:
            if output_file_path:
                os.remove(output_file_path)
