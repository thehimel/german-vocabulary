from django.urls import reverse
from django.views.generic import TemplateView
from rest_framework.response import Response
from rest_framework.views import APIView


class HomeView(TemplateView):
    template_name = "base/welcome.html"


class MessageView(TemplateView):
    template_name = "base/message.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["title"] = self.request.GET.get("title", "You Got the Following Messages")
        return context


class HomeAPIView(APIView):
    @staticmethod
    def get(request):
        named_urls = [
            "base:api",
            "speech:home",
            "trans:home",
            "words:api_list",
        ]
        urls = [request.build_absolute_uri(reverse(named_url)) for named_url in named_urls]
        return Response(urls)
