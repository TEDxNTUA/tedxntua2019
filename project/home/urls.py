from django.urls import path

from .views import HomeView, set_language

urlpatterns = [
    path('language', set_language, name="language"),
    path('', HomeView.as_view(), name='index'),
]
