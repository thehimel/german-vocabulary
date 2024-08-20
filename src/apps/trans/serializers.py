from rest_framework import serializers


class TranslateSerializer(serializers.Serializer):
    text = serializers.CharField(required=True)
    source_language_code = serializers.CharField(required=False, default="auto")
    target_language_code = serializers.CharField(required=False, default="en")

class TranslateWordRequestSerializer(serializers.Serializer):
    word = serializers.CharField(required=True)
    language_code = serializers.CharField(required=False, allow_blank=True)

class TranslateWordResponseSerializer(serializers.Serializer):
    language_code = serializers.CharField()
    word = serializers.CharField()
    parts_of_speech = serializers.CharField()
    article_singular = serializers.CharField(allow_blank=True)
    plural = serializers.CharField(allow_blank=True)
    article_plural = serializers.CharField(allow_blank=True)
    sentence = serializers.CharField()
    level = serializers.CharField()
