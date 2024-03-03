import re


def parse_cloudinary_url(cloudinary_url: str) -> dict:
    """Example: CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>"""

    pattern = re.compile(r"cloudinary://(\w+):(\w+)@(\w+)")
    match = pattern.match(cloudinary_url)

    return {"CLOUD_NAME": match.group(3), "API_KEY": match.group(1), "API_SECRET": match.group(2)}
