from django.shortcuts import render, redirect
from django.views import View
from django.utils import translation


class AboutView(View):
    template_name = 'about/index.html'

    def get(self, request):
        return render(request, self.template_name, {})


def set_language(request):
    language = request.GET.get('language')
    url = request.GET.get('url')
    print(language)
    print(url)
    translation.activate(language)
    request.session[translation.LANGUAGE_SESSION_KEY] = language
    return redirect(url)
