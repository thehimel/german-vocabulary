from django.urls import reverse
from rest_framework.response import Response
from rest_framework.views import APIView


class HomeAPIView(APIView):
    @staticmethod
    def get(request):
        named_urls = [
            "api:home",
            "api:words:list",
            "api:trans:home",
            "api:speech:home",
        ]
        urls = [request.build_absolute_uri(reverse(named_url)) for named_url in named_urls]
        return Response(urls)
