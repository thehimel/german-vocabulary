from django.views import View
from django.contrib import messages
from django.utils.translation import gettext as _
from django.shortcuts import redirect, get_object_or_404
from django.views.generic import TemplateView, DetailView

from apps.words.models import Word


class HomeView(TemplateView):
    template_name = "cards/index.html"


class CardDetailView(DetailView):
    template_name = "cards/detail.html"
    model = Word
    context_object_name = 'object'
    slug_field = "pk"


class NextCardView(View):
    @staticmethod
    def get(request, action='next', slug=None):
        current_word = get_object_or_404(Word, pk=slug) if slug else None

        if current_word:
            if action == 'next':
                next_card = Word.objects.filter(pk__gt=current_word.pk).order_by('pk').first()
                if not next_card:
                    messages.warning(request, _('This is the last word in this section.'))
            elif action == 'previous':
                next_card = Word.objects.filter(pk__lt=current_word.pk).order_by('-pk').first()
                if not next_card:
                    messages.warning(request, _('This is the first word in this section.'))
            else:
                next_card = Word.objects.order_by('?').first()

            if next_card:
                slug = next_card.pk

        return redirect('cards:detail', slug=slug)
