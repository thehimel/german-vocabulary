import os
from io import BytesIO

from django.core.files.uploadedfile import InMemoryUploadedFile
from PIL import Image


def resize_image(instance, field_name, title=None, height_limit=300, square=True):
    """Resize image to the given limit and crop from center if square is needed."""

    source = getattr(instance, field_name)

    # Opening the uploaded image.
    image = Image.open(source)
    output = BytesIO()

    height, width = source.height, source.width

    # If square output is needed, crop the image.
    if square:
        width_limit = height_limit

        if width > height:
            # make square by cutting off equal amounts from left and right.
            left, right = (width - height) / 2, (width + height) / 2
            top, bottom = 0, height
            image = image.crop((left, top, right, bottom))

        elif height > width:
            # Make square by cutting off equal amounts from top and bottom.
            left, right = 0, width
            top, bottom = (height - width) / 2, (height + width) / 2
            image = image.crop((left, top, right, bottom))

    # If square output is not needed, calculate the height keeping the ratio.
    else:
        width_limit = round((width / height) * height_limit)

    # Resize/modify the image
    if width > width_limit and height > height_limit:
        image = image.resize((width_limit, height_limit))

    # For the default file selection at the beginning, it doesn't have content type.
    # For the default profile picture, as it is just a location and not a file, no content_type will be there, and the
    # function will return without saving a new file. It also solves the problem of repeated default image with every
    # new user creation.
    if hasattr(source.file, "content_type"):
        content_type = source.file.content_type
    else:
        return

    # Fetching the part after the last slash.
    file_format = content_type.split("/")[-1]

    # Here format can be, format='JPEG', format='PNG'.
    image.save(output, format=file_format, quality=90)

    file_name = f"{title}{os.path.splitext(source.name)[1]}" if title else source.name

    # Update the ImageField value to be the newly modified image value.
    output.seek(0)
    compressed_source = InMemoryUploadedFile(output, None, file_name, content_type, output.getbuffer().nbytes, None)

    # As can not update the attribute with equal sign, we set new value to the attribute with setattr().
    setattr(instance, field_name, compressed_source)
