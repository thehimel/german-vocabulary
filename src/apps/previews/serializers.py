from rest_framework import serializers

from apps.previews.models import Preview, PreWord
from apps.words.models import Language, Article, PartOfSpeech
from apps.words.serializers import ArticleSerializer, PartOfSpeechSerializer, SimpleLanguageSerializer


class PreviewListSerializer(serializers.ModelSerializer):
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


class PreWordSerializer(serializers.ModelSerializer):
    languageCode = serializers.CharField(write_only=True, min_length=2)
    partOfSpeech = serializers.CharField(write_only=True)
    article = serializers.CharField(write_only=True, required=False, allow_blank=True)
    plural = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = PreWord
        fields = ['languageCode', 'title', 'article', 'plural', 'sentence', 'partOfSpeech', 'level']

    def validate(self, data):
        part_of_speech = data.get('partOfSpeech', '').lower()
        errors = []

        if part_of_speech == 'noun':
            if 'article' not in data or not data['article'].strip():
                errors.append("Article field is required and cannot be empty for 'Noun' part of speech.")
            if 'plural' not in data or not data['plural']:
                errors.append("Plural field is required and cannot be empty for 'Noun' part of speech.")

        if errors:
            raise serializers.ValidationError({"errors": errors})

        return data

    def create(self, validated_data):
        article_title = validated_data.pop('article')
        part_of_speech_title = validated_data.pop('partOfSpeech')
        language_code = validated_data.pop('languageCode')

        language = Language.objects.get(code=language_code)
        article = Article.objects.filter(language=language, title=article_title).first()
        part_of_speech = PartOfSpeech.objects.filter(title=part_of_speech_title).first()

        if part_of_speech_title.lower() != 'noun':
            validated_data.pop('article', None)
            validated_data.pop('plural', None)

        pre_word = PreWord.objects.create(language=language, **validated_data)
        pre_word.parts_of_speech.add(part_of_speech)

        if part_of_speech_title.lower() == 'noun' and article:
            pre_word.articles.add(article)

        pre_word.save()
        return pre_word


class PreviewUpdateSerializer(serializers.ModelSerializer):
    partOfSpeech = serializers.CharField(write_only=True)
    words = PreWordSerializer(many=True)

    class Meta:
        model = Preview
        fields = ['id', 'partOfSpeech', 'words']

    def update(self, instance, validated_data):
        part_of_speech_title = validated_data.pop('partOfSpeech')
        part_of_speech = PartOfSpeech.objects.filter(title=part_of_speech_title).first()
        words_data = validated_data.pop('words')

        instance.words.clear()
        for word_data in words_data:
            pre_word_serializer = PreWordSerializer(data=word_data)
            if pre_word_serializer.is_valid():
                pre_word_serializer.save()
                instance.words.add(pre_word_serializer.instance)

        instance.part_of_speech = part_of_speech
        instance.save()
        return instance
