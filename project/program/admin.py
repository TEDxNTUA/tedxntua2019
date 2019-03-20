from django.contrib import admin

from project.utils.admin import PartiallyTranslatableAdmin
from .models import Presenter, Activity
from .forms import ActivityModelForm


class ActivityAdmin(PartiallyTranslatableAdmin):
    form = ActivityModelForm


admin.site.register(Presenter, PartiallyTranslatableAdmin)
admin.site.register(Activity, ActivityAdmin)
