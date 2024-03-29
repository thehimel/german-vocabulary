from rest_framework import serializers

from apps.previews.models import Preview
from apps.words.serializers import ArticleSerializer, PartOfSpeechSerializer, SimpleLanguageSerializer


class PreBundleListSerializer(serializers.ModelSerializer):
    language = SimpleLanguageSerializer(read_only=True)
    part_of_speech = PartOfSpeechSerializer(read_only=True)
    article = ArticleSerializer(read_only=True)

    class Meta:
        model = Preview
        fields = [
            "id",
            "title",
            "level",
            "language",
            "part_of_speech",
            "article",
        ]
