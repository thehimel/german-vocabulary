from django.urls import reverse
from rest_framework.views import APIView
from rest_framework.response import Response


class HomeAPIView(APIView):
    @staticmethod
    def get(request):
        named_urls = [
            "api:home",
            "api:words",
            "api:translate",
            "api:text-to-speech",
        ]
        urls = [request.build_absolute_uri(reverse(named_url)) for named_url in named_urls]
        return Response(urls)
