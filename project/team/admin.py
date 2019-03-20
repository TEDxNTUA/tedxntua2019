from django.contrib import admin

from project.utils.admin import PartiallyTranslatableAdmin
from .models import TeamMember


admin.site.register(TeamMember, PartiallyTranslatableAdmin)
