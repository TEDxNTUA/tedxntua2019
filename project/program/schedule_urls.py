from django.urls import path

from .views import ScheduleView, set_language


urlpatterns = [
    path('', ScheduleView.as_view(), name='schedule'),
    path('language', set_language, name="language")
]
