from django.shortcuts import render
from django.http import HttpResponse
from django.utils.translation import gettext_lazy


def index(request):
    output = gettext_lazy("test_message")
    return HttpResponse(output)
