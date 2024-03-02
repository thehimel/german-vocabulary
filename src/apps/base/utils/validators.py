from django.core.exceptions import ValidationError


def validate_file_size(value, max_limit_in_mb=1):
    max_limit = max_limit_in_mb * 1024 * 1024
    if value.size > max_limit:
        raise ValidationError(
            f"File size too large. File size should not exceed {max_limit_in_mb} MB. "
            f"Current file size is {value.size/(1024*1024):.2f} MB."
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
