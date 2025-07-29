import hashlib
import base64
import os
from io import BytesIO

import redis
from django.conf import settings
from django.http import FileResponse
from drf_yasg.utils import swagger_auto_schema
from gtts import gTTS
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.api.utils import serializer_to_manual_parameters
from apps.speech.serializers import TextToSpeechSerializer

# Redis connection setup
try:
    redis_url = os.getenv('REDIS_URL') or getattr(settings, 'REDIS_URL', None)
    if redis_url:
        redis_client = redis.from_url(redis_url, decode_responses=False)  # Keep as False for binary data
        redis_client.ping()  # Test connection
        REDIS_AVAILABLE = True
    else:
        redis_client = None
        REDIS_AVAILABLE = False
except (redis.ConnectionError, AttributeError):
    redis_client = None
    REDIS_AVAILABLE = False


class TextToSpeechAPIView(APIView):
    @swagger_auto_schema(manual_parameters=serializer_to_manual_parameters(TextToSpeechSerializer))
    def get(self, request, *args, **kwargs):
        serializer = TextToSpeechSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        input_text = serializer.validated_data.get("text", "")
        language = serializer.validated_data.get("language", "en")

        if not input_text:
            return Response({"error": "The text parameter is missing."}, status=status.HTTP_400_BAD_REQUEST)

        # Create cache key from text, language, and slow parameter
        slow = False if language == "bn" else True
        cache_data = f"{input_text}_{language}_{slow}"
        cache_key = f"tts:{hashlib.md5(cache_data.encode('utf-8')).hexdigest()}"

        # Try to get from Redis cache first
        if REDIS_AVAILABLE and redis_client:
            try:
                cached_audio = redis_client.get(cache_key)
                if cached_audio:
                    # Convert base64 back to bytes
                    audio_data = base64.b64decode(cached_audio)
                    output_file = BytesIO(audio_data)

                    response = FileResponse(output_file, content_type="audio/mpeg")
                    response["Content-Disposition"] = 'attachment; filename="output.mp3"'
                    response["X-Cache-Status"] = "HIT"
                    return response
            except redis.RedisError:
                # If Redis fails, continue without caching
                pass

        # Generate TTS if not in cache
        try:
            tts = gTTS(text=input_text, lang=language, slow=slow)

            output_file = BytesIO()
            tts.write_to_fp(output_file)
            output_file.seek(0)

            # Read audio data for caching
            audio_data = output_file.read()
            output_file.seek(0)  # Reset for response

            # Cache the audio data in Redis permanently
            if REDIS_AVAILABLE and redis_client:
                try:
                    # Encode binary data as base64 for Redis storage
                    encoded_audio = base64.b64encode(audio_data).decode('utf-8')

                    # Cache forever - TTS results never change
                    redis_client.set(cache_key, encoded_audio)
                except redis.RedisError:
                    # If caching fails, continue serving the response
                    pass

            response = FileResponse(output_file, content_type="audio/mpeg")
            response["Content-Disposition"] = 'attachment; filename="output.mp3"'
            response["X-Cache-Status"] = "MISS"
            return response

        except Exception as e:
            return Response(
                {"error": f"Error generating audio: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
