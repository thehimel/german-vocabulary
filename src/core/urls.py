"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

from core.views import schema_view

urlpatterns = [
    path("admin/", admin.site.urls),
    path("accounts/", include("allauth.urls")),
    path("", include("apps.base.urls", namespace="base")),
    path("api/", include("apps.api.urls", namespace="api")),
    path("users/", include("apps.users.urls", namespace="users")),
    path("cards/", include("apps.cards.urls", namespace="cards")),
    path("words/", include("apps.words.urls", namespace="words")),
]

oas_urls = [
    path("swagger/", schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui"),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
]

if settings.DEBUG:
    # To serve static files in debug mode
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

    # To serve media files in debug mode
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

    # To serve OpenAPI Specification
    urlpatterns += oas_urls
