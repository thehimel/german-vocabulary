from django.contrib import messages
from django.db.models.functions import Lower
from django.shortcuts import get_object_or_404, redirect
from django.utils.translation import gettext as _
from django.views import View
from django.views.generic import DetailView, TemplateView

from apps.base.utils.decorators import language_preferences_required
from apps.base.utils.languages import get_level, get_primary_language, get_secondary_language
from apps.words.models import Bundle, Word


class HomeView(TemplateView):
    template_name = "cards/index.html"


class CardDetailView(DetailView):
    template_name = "cards/detail.html"
    model = Word
    context_object_name = "object"

    def get_object(self, queryset=None):
        pk = self.kwargs["slug"]
        primary_word = Word.objects.get(pk=pk)
        secondary_word = None
        bundle = Bundle.objects.filter(words__pk=pk).first()
        if bundle:
            secondary_word = bundle.words.filter(language__code=get_secondary_language(request=self.request)).first()
        return {"primary_word": primary_word, "secondary_word": secondary_word if secondary_word else primary_word}

    @language_preferences_required
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class NextCardView(View):
    @staticmethod
    def get_next_word(request, action, current_word, language, level):
        next_card = None
        if action == "first":
            next_card = Word.objects.filter(language__code=language, hidden=False).order_by(Lower("title")).first()
        elif action == "any":
            next_card = Word.objects.filter(language__code=language, level=level, hidden=False).order_by("?").first()
        elif action == "next":
            next_card = (
                Word.objects.filter(language__code=language, level=level, hidden=False)
                .annotate(lower_title=Lower("title"))
                .filter(lower_title__gt=current_word.title.lower())
                .order_by("lower_title")
                .first()
            )
            if not next_card:
                messages.warning(request, _("This is the last word in this section."))
        elif action == "previous":
            next_card = (
                Word.objects.filter(language__code=language, level=level, hidden=False)
                .annotate(lower_title=Lower("title"))
                .filter(lower_title__lt=current_word.title.lower())
                .order_by("lower_title")
                .first()
            )
            if not next_card:
                messages.warning(request, _("This is the first word in this section."))
        return next_card

    def get(self, request, action="next", slug=None):
        language = get_primary_language(request=request)
        level = get_level(request=request)
        current_word = get_object_or_404(Word, pk=slug) if slug else None
        next_card = self.get_next_word(
            request=request, action=action, current_word=current_word, language=language, level=level
        )

        if next_card:
            slug = next_card.pk

        # Redirect to home if no data in the table for this model.
        # TODO: Redirect to a not found page if no word found with this language preference.
        return redirect("cards:detail", slug=slug) if slug else redirect("base:home")
