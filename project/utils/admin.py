from django.utils.translation import ugettext_lazy as _
from parler.admin import TranslatableAdmin


class PartiallyTranslatableAdmin(TranslatableAdmin):

    def get_fieldsets(self, request, obj=None):
        '''
        Splits admin form fields into the default fieldset and the translatable fieldset.
        '''
        # If model is not translatable, return default fieldsets
        if not hasattr(self.model, '_parler_meta'):
            return super().get_fieldsets(request, obj)

        translated_fields = self.model._parler_meta.get_translated_fields()
        fieldsets = super().get_fieldsets(request, obj)
        # Remove translated fields from default fieldset
        fieldsets[0][1]['fields'] = [f for f in fieldsets[0][1]['fields'] if f not in translated_fields]
        # Add translatable fieldset
        fieldsets += [(_('Translatable'), {'fields': translated_fields})]
        return fieldsets
