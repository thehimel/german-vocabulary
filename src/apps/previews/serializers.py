from apps.previews.models import PreBundle
from rest_framework import serializers
from apps.words.serializers import SimpleLanguageSerializer, ArticleSerializer, PartOfSpeechSerializer


class PreBundleListSerializer(serializers.ModelSerializer):
    language = SimpleLanguageSerializer(read_only=True)
    part_of_speech = PartOfSpeechSerializer(read_only=True)
    article = ArticleSerializer(read_only=True)

    class Meta:
        model = PreBundle
        fields = [
            "id",
            "title",
            "level",
            "language",
            "part_of_speech",
            "article",
        ]
