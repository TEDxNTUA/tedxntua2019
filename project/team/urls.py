from django.urls import path

from .views import TeamView, set_language


urlpatterns = [
    path('language', set_language, name="language"),
    path('', TeamView.as_view(), name='team'),
]
