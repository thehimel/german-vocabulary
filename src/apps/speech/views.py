from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from gtts import gTTS
from django.conf import settings
from django.http import FileResponse
import os


class TextToSpeechAPIView(APIView):
    def post(self, request, *args, **kwargs):
        input_text = request.data.get('text', '')
        language_code = request.data.get('language_code', 'en')  # Default to English if no language code is provided

        if not input_text:
            return Response({'error': 'Text parameter is missing'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            tts = gTTS(text=input_text, lang=language_code, slow=False)

            # Using MEDIA_ROOT to build the path
            media_root = settings.MEDIA_ROOT
            output_file_path = os.path.join(media_root, 'output.mp3')

            tts.save(output_file_path)

            response = FileResponse(open(output_file_path, 'rb'), content_type='audio/mpeg')
            response['Content-Disposition'] = 'attachment; filename="output.mp3"'
            return response
        except Exception as e:
            return Response({'error': f'Error generating audio: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        finally:
            # Remove the temporary output file
            os.remove(output_file_path)
