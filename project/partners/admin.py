from django.contrib import admin

from project.utils.admin import PartiallyTranslatableAdmin
from .models import Partner


class PartnerAdmin(PartiallyTranslatableAdmin):
    list_display = ('__str__', 'partner_type', 'link', 'is_published')
    list_filter = ('partner_type', 'is_published')
    ordering = ['partner_type']


admin.site.register(Partner, PartnerAdmin)
