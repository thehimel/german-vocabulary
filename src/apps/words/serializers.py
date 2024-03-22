from rest_framework import serializers
from apps.words.models import Word, Language, PartOfSpeech, Article, Note


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ['code']


class PartOfSpeechSerializer(serializers.ModelSerializer):
    class Meta:
        model = PartOfSpeech
        fields = ['title']


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['title']


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['title']  # Add other fields as needed


class LinkedWordSerializer(serializers.ModelSerializer):
    language = LanguageSerializer()

    class Meta:
        model = Word
        fields = ['title', 'language']


class TranslationSerializer(serializers.ModelSerializer):
    language = LanguageSerializer()

    class Meta:
        model = Word
        fields = ['title', 'language']


class WordListSerializer(serializers.ModelSerializer):
    articles = ArticleSerializer(many=True, read_only=True)
    parts_of_speech = PartOfSpeechSerializer(many=True, read_only=True)
    language = LanguageSerializer(read_only=True)
    # notes = NoteSerializer(many=True, read_only=True)
    # linked_words = LinkedWordSerializer(many=True, read_only=True)
    # translations = TranslationSerializer(many=True, read_only=True)

    class Meta:
        model = Word
        fields = ["id", "level", "language", "title", "articles", "parts_of_speech", "sentence"]
