from django.shortcuts import render
from django.views import View

from .models import Presenter, Activity, Stage


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
        return render(request, self.template_name, {
            'schedule': schedule,
            'stages': stages,
        })
