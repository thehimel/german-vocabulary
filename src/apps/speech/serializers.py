from rest_framework import serializers


class TextToSpeechSerializer(serializers.Serializer):
    text = serializers.CharField(required=True, help_text="The text to convert into speech.")
    language = serializers.CharField(
        required=False, default="en", help_text="The language for speech output. Defaults to English ('en')."
    )
