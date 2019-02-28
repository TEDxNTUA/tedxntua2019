from django.shortcuts import render, redirect
from django.views import View
from .models import Partner
from django.utils import translation


class PartnersView(View):
    template = 'partners/index.html'

    def get(self, request, *args, **kwargs):
        partners = Partner.objects.get_partners_by_type()
        return render(request, self.template, {'partners': partners})


def set_language(request):
    language = request.GET.get('language')
    url = request.GET.get('url')
    print(language)
    print(url)
    translation.activate(language)
    request.session[translation.LANGUAGE_SESSION_KEY] = language
    return redirect(url)
