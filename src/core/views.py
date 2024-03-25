from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
   openapi.Info(
      title="Vocabulary API",
      default_version='v1',
      description="A simple and easy way to learn German vocabulary.",
   ),
   public=True,
   permission_classes=[permissions.AllowAny]
)
