from django.contrib import admin

# Register your models here.
from .models import Presenter, Activity
from parler.admin import TranslatableAdmin

admin.site.register(Presenter, TranslatableAdmin)
admin.site.register(Activity, TranslatableAdmin)
