from django.core.management.base import BaseCommand

from apps.words.models import Word


class Command(BaseCommand):
    help = "Update all Word objects"

    def handle(self, *args, **options):
        words = Word.objects.all()
        for word in words:
            word.save()
        self.stdout.write(self.style.SUCCESS("All Word objects updated successfully"))
