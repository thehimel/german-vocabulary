from rest_framework import serializers

from apps.words.models import Article, Language, Note, PartOfSpeech, Word


class WordListQueryParamsSerializer(serializers.Serializer):
    primary_language = serializers.CharField(required=False, default="de")
    level = serializers.CharField(required=False, default="a1")
    q = serializers.CharField(required=False)


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ["title"]


class LanguageSerializer(serializers.ModelSerializer):
    articles = ArticleSerializer(many=True, read_only=True)

    class Meta:
        model = Language
        fields = ["code", "name", "articles"]


class SimpleLanguageSerializer(LanguageSerializer):
    class Meta:
        model = Language
        fields = ["code"]


class PartOfSpeechSerializer(serializers.ModelSerializer):
    class Meta:
        model = PartOfSpeech
        fields = ["title"]


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["title"]  # Add other fields as needed


class LinkedWordSerializer(serializers.ModelSerializer):
    language = SimpleLanguageSerializer()

    class Meta:
        model = Word
        fields = ["title", "language"]


class TranslationSerializer(serializers.ModelSerializer):
    language = SimpleLanguageSerializer()
    articles = ArticleSerializer(many=True, read_only=True)
    parts_of_speech = PartOfSpeechSerializer(many=True, read_only=True)

    class Meta:
        model = Word
        fields = ["id", "title", "plural", "language", "articles", "parts_of_speech", "sentence"]


class WordListSerializer(serializers.ModelSerializer):
    language = SimpleLanguageSerializer(read_only=True)
    articles = ArticleSerializer(many=True, read_only=True)
    parts_of_speech = PartOfSpeechSerializer(many=True, read_only=True)
    translations = TranslationSerializer(many=True, read_only=True)

    class Meta:
        model = Word
        fields = [
            "id",
            "level",
            "title",
            "plural",
            "language",
            "articles",
            "parts_of_speech",
            "sentence",
            "translations",
        ]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        secondary_language = self.context["request"].query_params.get("secondary_language")
        if secondary_language:
            translations = instance.translations.filter(language__code=secondary_language)
            data["translations"] = TranslationSerializer(translations, many=True).data
        return data


class WordSerializer(WordListSerializer):
    notes = NoteSerializer(many=True, read_only=True)
    linked_words = LinkedWordSerializer(many=True, read_only=True)

    class Meta(WordListSerializer.Meta):
        fields = WordListSerializer.Meta.fields + ["notes", "linked_words"]
