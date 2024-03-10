from django.contrib import messages
from django.shortcuts import get_object_or_404, redirect
from django.utils.translation import gettext as _
from django.views import View
from django.views.generic import DetailView, TemplateView

from apps.base.utils.decorators import language_preferences_required
from apps.base.utils.languages import get_selected_language
from apps.words.models import Word


class HomeView(TemplateView):
    template_name = "cards/index.html"


class CardDetailView(DetailView):
    template_name = "cards/detail.html"
    model = Word
    context_object_name = 'primary_word'

    def get_object(self, queryset=None):
        return Word.objects.get(pk=self.kwargs['slug'])  # Adjust the field name as needed

    @language_preferences_required
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class NextCardView(View):
    @staticmethod
    def get_random_word(language: str):
        return Word.objects.filter(language__title=language).order_by("?").first()

    @staticmethod
    def get_next_word(request, action, current_word, language):
        next_card = None
        if action == "next":
            next_card = Word.objects.filter(language__title=language, pk__gt=current_word.pk).order_by("pk").first()
            if not next_card:
                messages.warning(request, _("This is the last word in this section."))
        elif action == "previous":
            next_card = Word.objects.filter(language__title=language, pk__lt=current_word.pk).order_by("-pk").first()
            if not next_card:
                messages.warning(request, _("This is the first word in this section."))
        return next_card

    def get(self, request, action="next", slug=None):
        language = get_selected_language(request=request)
        current_word = get_object_or_404(Word, pk=slug) if slug else None
        next_card = (
            self.get_next_word(request=request, action=action, current_word=current_word, language=language)
            if current_word
            else self.get_random_word(language=language)
        )

        if next_card:
            slug = next_card.pk

        # Redirect to home if no data in the table for this model.
        return redirect("cards:detail", slug=slug) if slug else redirect("base:home")
