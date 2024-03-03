from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse

from apps.users.constants import APP_NAME, DEFAULT_PROFILE_PICTURE, GENERAL, MANAGER, NAME_MAX_LENGTH
from apps.users.utils import user_directory_path
from apps.base.utils.images import resize_image
from apps.base.utils.validators import validate_file_size


class User(AbstractUser):
    first_name = models.CharField(max_length=NAME_MAX_LENGTH)
    last_name = models.CharField(max_length=NAME_MAX_LENGTH)

    USER_TYPE_CHOICES = [(GENERAL, "General"), (MANAGER, "Manager")]
    GENDER_CHOICES = [("F", "Female"), ("M", "Male"), ("O", "Other"), ("X", "Rather not say")]

    user_type = models.CharField(max_length=1, choices=USER_TYPE_CHOICES, default=GENERAL)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, blank=True)
    profile_picture = models.ImageField(
        default=DEFAULT_PROFILE_PICTURE,
        upload_to=user_directory_path,
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
