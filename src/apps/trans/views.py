from rest_framework.response import Response
from rest_framework.views import APIView

from apps.trans.utils import translator


class TranslateAPIView(APIView):
    @staticmethod
    def get(request):
        data = request.query_params
        text = data.get("text", "")
        src = data.get("source_language_code", "auto")
        dest = data.get("target_language_code", "en")
        return Response({"text": translator.translate(text=text, src=src, dest=dest)})
