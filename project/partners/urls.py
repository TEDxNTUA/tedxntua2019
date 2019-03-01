from django.urls import path
from .views import PartnersView, set_language


urlpatterns = [
    path('language', set_language, name="language"),
    path('', PartnersView.as_view(), name='partners'),
]
