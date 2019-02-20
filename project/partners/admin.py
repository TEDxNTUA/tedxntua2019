from django.contrib import admin
from .models import Partner
from parler.admin import TranslatableAdmin

admin.site.register(Partner, TranslatableAdmin)
