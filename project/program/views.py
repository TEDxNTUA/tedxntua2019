from django.shortcuts import render
from django.views import View
from .models import Presenter

class SpeakersView(View):

    template = 'program/speakers.html'

    def get(self, request, *args, **kwargs):
        speakers = Presenter.speakers.all()
        return render(request, self.template, {'speakers': speakers})
