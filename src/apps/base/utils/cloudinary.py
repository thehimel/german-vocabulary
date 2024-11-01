import re

def parse_cloudinary_url(cloudinary_url: str) -> dict:
    """Example: CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>"""

    # Regex to handle characters like hyphens, underscores, and others
    pattern = re.compile(r'cloudinary://([^:]+):([^@]+)@([^/]+)')
    match = pattern.match(cloudinary_url)

    # Check if match is None to avoid AttributeError
    if not match:
        raise ValueError("CLOUDINARY_URL format is incorrect")

    return {
        'CLOUD_NAME': match.group(3),
        'API_KEY': match.group(1),
        'API_SECRET': match.group(2)
    }
