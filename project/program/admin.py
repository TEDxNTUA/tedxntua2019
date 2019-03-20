from django.contrib import admin

from .models import Presenter, Activity
from .forms import ActivityModelForm
from parler.admin import TranslatableAdmin


class ActivityAdmin(TranslatableAdmin):
    form = ActivityModelForm


admin.site.register(Presenter, TranslatableAdmin)
admin.site.register(Activity, ActivityAdmin)
