from django.urls import path

from .views import AboutView, set_language


urlpatterns = [
    path('language', set_language, name="language"),
    path('', AboutView.as_view(), name='about'),
]
