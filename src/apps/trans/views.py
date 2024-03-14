from rest_framework.views import APIView
from rest_framework.response import Response
from apps.trans.utils import translator


class TranslateAPIView(APIView):
    @staticmethod
    def post(request):
        data = request.data
        text = data.get('text', '')
        src = data.get('source_language_code', 'auto')
        dest = data.get('target_language_code', 'en')
        return Response({'text': translator.translate(text=text, src=src, dest=dest)})
