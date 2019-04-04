from django.shortcuts import render, redirect
from django.views import View

from .models import Presenter, Activity, Stage
from django.utils import translation


class SpeakersView(View):
    template_name = 'program/speakers.html'

    def get(self, request, *args, **kwargs):
        speakers = Presenter.objects.get_speakers()
        host = Presenter.objects.get_host()
        try:
            host = host[0]
        except:
            host = None
        return render(request, self.template_name, {'speakers': speakers, 'host': host})


class ScheduleView(View):
    template_name = 'program/schedule.html'

    def get(self, request):
        schedule = Activity.objects.get_schedule()
        stages = Stage.get_verbose_names()
        return render(request, self.template_name, {
            'schedule': schedule,
            'stages': stages,
            'day': '2019-04-06',
        })


def set_language(request):
    language = request.GET.get('language')
    url = request.GET.get('url')
    translation.activate(language)
    request.session[translation.LANGUAGE_SESSION_KEY] = language
    return redirect(url)
