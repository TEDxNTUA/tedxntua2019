from django.shortcuts import render, redirect
from django.views import View

from .models import Presenter, Activity, Stage
from django.utils import translation


class SpeakersView(View):
    template_name = 'program/speakers.html'

    def get(self, request, *args, **kwargs):
        speakers = Presenter.speakers.all()
        return render(request, self.template_name, {'speakers': speakers})


class ScheduleView(View):
    template_name = 'program/schedule.html'

    def get(self, request):
        schedule = Activity.objects.get_schedule()
        stages = Stage.get_verbose_names()
        print("eee")
        print(list(schedule.items())[0][1])
        print(stages)
        return render(request, self.template_name, {
            'schedule': schedule,
            'stages': stages,
        })


def set_language(request):
    language = request.GET.get('language')
    url = request.GET.get('url')
    print(language)
    print(url)
    translation.activate(language)
    request.session[translation.LANGUAGE_SESSION_KEY] = language
    return redirect(url)
