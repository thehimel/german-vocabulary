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


class WordSerializer(serializers.ModelSerializer):
    articles = ArticleSerializer(many=True, read_only=True)
    parts_of_speech = PartOfSpeechSerializer(many=True, read_only=True)
    notes = NoteSerializer(many=True, read_only=True)
    linked_words = serializers.PrimaryKeyRelatedField(many=True, queryset=Word.objects.all())
    translations = serializers.PrimaryKeyRelatedField(many=True, queryset=Word.objects.all())

    class Meta:
        model = Word
        fields = '__all__'
