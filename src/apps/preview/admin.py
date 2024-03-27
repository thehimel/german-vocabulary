from django.contrib import admin
from apps.preview.models import PreWord, PreBundle
from apps.words.admin import WordAdmin, BundleAdmin


admin.site.register(PreWord, WordAdmin)
admin.site.register(PreBundle, BundleAdmin)
