from django.test import TestCase
from apps.base.utils.cloudinary import parse_cloudinary_url


class CloudinaryUrlParsing(TestCase):
    def test_parse_cloudinary_url(self):
        cloudinary_url = "cloudinary://api_key:api_secret@cloud_name"
        expected_result = {
            "CLOUD_NAME": "cloud_name",
            "API_KEY": "api_key",
            "API_SECRET": "api_secret"
        }

        result = parse_cloudinary_url(cloudinary_url)
        self.assertEqual(result, expected_result)
