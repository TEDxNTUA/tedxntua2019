from django.contrib import admin
from django.utils.translation import ugettext_lazy as _

from project.utils.admin import PartiallyTranslatableAdmin
from .models import Presenter, Activity
from .forms import ActivityModelForm


class PresenterAdmin(PartiallyTranslatableAdmin):
    list_display = ('__str__', 'occupation', 'link', 'is_published')
    list_filter = ('activity__activity_type', 'is_published')


class ActivityAdmin(PartiallyTranslatableAdmin):
    form = ActivityModelForm
    list_display = ('__str__', 'activity_type', 'presenter_display', 'start_time', 'end_time', 'is_published')
    list_filter = ('activity_type', 'is_published')
    ordering = ['start']

    def presenter_display(self, obj):
        return ', '.join([str(p) for p in obj.presenters.all()])
    presenter_display.short_description = _('Presenters')


admin.site.register(Presenter, PresenterAdmin)
admin.site.register(Activity, ActivityAdmin)
