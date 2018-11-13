from django.contrib import admin

# Register your models here.
from .models import Presenter, Activity

admin.site.register(Presenter)
admin.site.register(Activity)
