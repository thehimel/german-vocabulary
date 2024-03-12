from io import BytesIO

from django.http import FileResponse
from gtts import gTTS
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


class TextToSpeechAPIView(APIView):
    @staticmethod
    def post(request, *args, **kwargs):
        input_text = request.data.get("text", "")
        language_code = request.data.get("language_code", "en")

        if not input_text:
            return Response({"error": "Text parameter is missing"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            tts = gTTS(text=input_text, lang=language_code, slow=False)

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
