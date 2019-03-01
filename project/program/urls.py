from django.urls import path
from .views import SpeakersView, set_language


urlpatterns = [
    path('', SpeakersView.as_view(), name='speakers'),
    path('language', set_language, name="language"),
]
