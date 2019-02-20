from django.contrib import admin

# Register your models here.
from .models import TeamMember
from parler.admin import TranslatableAdmin

admin.site.register(TeamMember, TranslatableAdmin)
