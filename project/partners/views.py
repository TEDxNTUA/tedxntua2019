from django.shortcuts import render
from django.views import View
from .models import Partner

class PartnersView(View):

    template = 'partners/index.html'

    def get(self, request, *args, **kwargs):
        partners = Partner.objects.all()
        return render(request, self.template, {'partners': partners})
