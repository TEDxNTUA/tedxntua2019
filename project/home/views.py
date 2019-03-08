from django.views.generic import TemplateView
from django.utils import translation
# from django.shortcuts import redirect
from django.shortcuts import render, redirect
from django.conf import settings
from django.http import HttpResponse
from project.program.models import Presenter



class HomeView(TemplateView):
    template_name = 'home/index.html'
    def get(self, request, *args, **kwargs):
        speakers = Presenter.speakers.all()
        return render(request, self.template_name, {'speakers': speakers})


def set_language(request):
    language = request.GET.get('language')
    url = request.GET.get('url')
    print(language)
    print(url)
    translation.activate(language)
    request.session[translation.LANGUAGE_SESSION_KEY] = language
    return redirect(url)
