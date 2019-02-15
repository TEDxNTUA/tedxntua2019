from django.contrib import admin
from .models import Partner
from parler.forms import TranslatableModelForm
from parler.admin import TranslatableAdmin


class PartnerAdminForm(TranslatableModelForm):
    pass


class PartnerAdmin(TranslatableAdmin):
    form = PartnerAdminForm


admin.site.register(Partner, PartnerAdmin)
