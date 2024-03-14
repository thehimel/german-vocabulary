from rest_framework.views import APIView
from rest_framework.response import Response
from googletrans import Translator


class TranslateAPIView(APIView):
    @staticmethod
    def post(request):
        data = request.data
        text = data.get('text', '')
        source_language = data.get('source_language_code', 'auto')  # Detect source language if not provided
        target_language = data.get('target_language_code', 'en')

        translator = Translator()
        translated_text = translator.translate(text, src=source_language, dest=target_language).text

        return Response({'text': translated_text})
