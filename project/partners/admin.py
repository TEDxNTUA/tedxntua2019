from django.contrib import admin
from django import forms
from .models import Partner
import i18nfield.forms as i18nforms

class PartnerForm(forms.ModelForm):
    def __str__(self):
        return "partner_form"
    class Meta:
        model = Partner
        fields = ['name', 'partner_type', 'link']
        widgets = {
            'name': i18nforms.I18nTextInput,
        }

class PartnerAdmin(admin.ModelAdmin):
    form = PartnerForm


admin.site.register(Partner, PartnerAdmin)
