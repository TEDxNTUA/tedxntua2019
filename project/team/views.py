from django.shortcuts import render, redirect
from django.views import View

from .models import TeamMember
from django.utils import translation


class TeamView(View):
    template_name = 'team/index.html'

    def get(self, request):
        teams = TeamMember.objects.get_teams()
        return render(request, self.template_name, {'teams': teams})


def set_language(request):
    language = request.GET.get('language')
    url = request.GET.get('url')
    print(language)
    print(url)
    translation.activate(language)
    request.session[translation.LANGUAGE_SESSION_KEY] = language
    return redirect(url)
