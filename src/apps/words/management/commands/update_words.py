from django.core.management.base import BaseCommand

from apps.words.models import Word


class Command(BaseCommand):
    help = 'Update all Word objects'

    def handle(self, *args, **options):
        words = Word.objects.all()
        for word in words:
            first_part_of_speech = word.parts_of_speech.first()
            if first_part_of_speech:
                word.part_of_speech = first_part_of_speech
                word.save()
        self.stdout.write(self.style.SUCCESS('All Word objects updated successfully'))
