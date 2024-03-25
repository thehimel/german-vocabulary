from rest_framework import serializers


class TranslateSerializer(serializers.Serializer):
    text = serializers.CharField(required=True)
    source_language_code = serializers.CharField(required=False, default="auto")
    target_language_code = serializers.CharField(required=False, default="en")
