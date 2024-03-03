from django.core.exceptions import ValidationError


def validate_file_size(file, max_size=2):
    """The max_size is in MB."""

    max_limit = max_size * 1024 * 1024
    if file.size > max_limit:
        raise ValidationError(
            f"File size too large. File size should not exceed {max_size} MB. "
            f"Current file size is {file.size / (1024 * 1024):.2f} MB."
        )


def validate_content_type(value, content_types, message):
    """
    File type options, content_types = ['application/pdf', 'video/mp4', 'audio/mpeg']

    When we create the model, that time file field will be there. When we update the model and don't upload any file,
    no file will exist. That time it will through error that content_type not available. Thus, we need to check if the
    object has the attribute. The try-except doesn't work here.
    """
    if hasattr(value.file, "content_type"):
        if value.file.content_type not in content_types:
            raise ValidationError(message)


def validate_content_type_jpeg(value):
    content_types = ["image/jpeg"]
    message = "Only JPG or JPEG file is accepted."
    validate_content_type(value, content_types, message)
