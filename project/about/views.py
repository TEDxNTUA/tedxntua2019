from django.shortcuts import render
from django.http import HttpResponse

from.models import About

# Create your views here.

def index(request):
    abouts = About.objects.all()
    input = {
        'abouts':abouts
    }
    return render(request, 'index.html', input)
