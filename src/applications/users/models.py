from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse

from applications.users.constants import DEFAULT_PROFILE_PICTURE, GENERAL, MANAGER, NAME_MAX_LENGTH
from applications.users.utils import profile_picture_directory, validate_file_size
from applications.users.constants import APP_NAME
from utilities.images import resize_image


class User(AbstractUser):
    first_name = models.CharField(max_length=NAME_MAX_LENGTH)
    last_name = models.CharField(max_length=NAME_MAX_LENGTH)

    USER_TYPE_CHOICES = [(GENERAL, "General"), (MANAGER, "Manager")]
    GENDER_CHOICES = [("F", "Female"), ("M", "Male"), ("O", "Other"), ("X", "Rather not say")]

    user_type = models.CharField(max_length=1, choices=USER_TYPE_CHOICES, default=GENERAL)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, blank=True)
    profile_picture = models.ImageField(
        default=DEFAULT_PROFILE_PICTURE,
        upload_to=profile_picture_directory,
        validators=[validate_file_size],
    )

    def save(self, *args, **kwargs):
        resize_image(form_data=self, field_name="profile_picture")
        super().save(*args, **kwargs)

    @property
    def is_general(self):
        return str(self.user_type) == GENERAL

    @property
    def is_manager(self):
        return str(self.user_type) == MANAGER

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    def get_absolute_url(self):
        return reverse(f"{APP_NAME}:profile", kwargs={"slug": self.username})
