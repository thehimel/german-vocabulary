from django.db.utils import IntegrityError
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from apps.previews.models import Preview, PreWord
from apps.words.models import Article, Language, PartOfSpeech
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
            "plural",
        ]


class PreWordSerializer(serializers.ModelSerializer):
    languageCode = serializers.CharField(write_only=True, min_length=2)
    partOfSpeech = serializers.CharField(write_only=True)
    article = serializers.CharField(write_only=True, required=False, allow_blank=True)
    plural = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = PreWord
        fields = ["languageCode", "title", "article", "plural", "sentence", "partOfSpeech", "level"]

    def validate(self, data):
        part_of_speech = data.get("partOfSpeech", "").lower()
        language_code = data.get("languageCode", "").lower()
        errors = []

        if part_of_speech == "noun" and language_code in ['de', 'en']:
            if "plural" not in data or not data["plural"]:
                errors.append("Plural field is required and cannot be empty for 'Noun' part of speech.")

        if errors:
            raise serializers.ValidationError({"message": {"errors": errors}})

        return data

    def create(self, validated_data):
        title = validated_data["title"]
        try:
            article_title = validated_data.pop("article")
            part_of_speech_title = validated_data.pop("partOfSpeech")
            language_code = validated_data.pop("languageCode")

            language = Language.objects.get(code=language_code)
            part_of_speech = PartOfSpeech.objects.get(title__iexact=part_of_speech_title)

            if part_of_speech_title.lower() != "noun":
                validated_data.pop("article", None)
                validated_data.pop("plural", None)

            pre_word = PreWord.objects.create(language=language, part_of_speech=part_of_speech, **validated_data)
            if part_of_speech_title.lower() == "noun" and article_title:
                article = Article.objects.get(language=language, title=article_title)
                pre_word.articles.add(article)

            pre_word.save()
            return pre_word
        except IntegrityError as e:
            raise ValidationError(
                {"message": [f"Encountered integrity error during the creation of the word: {title}"]}
            )
        except Exception as e:
            raise ValidationError({"message": [f"Encountered error during the creation of the word: {title}"]})


class PreviewUpdateSerializer(serializers.ModelSerializer):
    languageCode = serializers.CharField(write_only=True, min_length=2)
    partOfSpeech = serializers.CharField(write_only=True, required=False, allow_blank=True)
    article = serializers.CharField(write_only=True, required=False, allow_blank=True)
    words = PreWordSerializer(many=True)

    class Meta:
        model = Preview
        fields = ["title", "level", "languageCode", "partOfSpeech", "article", "plural", "words"]

    @staticmethod
    def _save_words(instance, words_data):
        instance.words.clear()
        for word_data in words_data:
            pre_word_serializer = PreWordSerializer(data=word_data)
            if pre_word_serializer.is_valid():
                pre_word_serializer.save()
                instance.words.add(pre_word_serializer.instance)

    def create(self, validated_data):
        title = validated_data.pop("title")
        level = validated_data.pop("level")
        language_code = validated_data.pop("languageCode")
        language = Language.objects.get(code=language_code)

        part_of_speech_title = validated_data.pop("partOfSpeech")
        part_of_speech = PartOfSpeech.objects.filter(title__iexact=part_of_speech_title).first()
        words_data = validated_data.pop("words")

        instance = Preview.objects.create(title=title, language=language, level=level)

        self._save_words(instance, words_data)

        instance.part_of_speech = part_of_speech
        instance.in_review = True
        instance.save()
        return instance

    def update(self, instance, validated_data):
        part_of_speech_title = validated_data.pop("partOfSpeech")
        part_of_speech = PartOfSpeech.objects.filter(title__iexact=part_of_speech_title).first()
        words_data = validated_data.pop("words")

        self._save_words(instance, words_data)

        instance.part_of_speech = part_of_speech
        instance.in_review = True
        instance.save()
        return instance
