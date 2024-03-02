# Configuration

## Cloudinary

### Setup

* Install library: [django-cloudinary-storage](https://pypi.org/project/django-cloudinary-storage/)

#### Updated settings.py

```
INSTALLED_APPS = [
    # ...
    'django.contrib.staticfiles',
    'cloudinary_storage',
    'cloudinary',
    # ...
]

CLOUDINARY_STORAGE = {
    'CLOUD_NAME': 'your_cloud_name',
    'API_KEY': 'your_api_key',
    'API_SECRET': 'your_api_secret'
}

MEDIA_URL = '/media/'  # or any prefix you choose
DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'
```

### Configration

* Updated the cloudinary upload configuration as shown in the screenshot.

![cloudinary_upload_settings.png](images/cloudinary_upload_settings.png)

### Upload Default Profile Picture

* Login and upload the profile picture. You need to create the parent directory "media".
* The file will automatically get renamed. But you just need to change back the file name i.e. "profile-picture".
* The file extension is not visible but it is same as the uploaded one. So, you do not need to add an extension.
