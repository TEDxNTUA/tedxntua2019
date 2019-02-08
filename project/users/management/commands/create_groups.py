from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from project.partners.models import Partner
from project.program.models import Activity, Presenter

PERMISSIONS = ['view', 'edit', 'add', 'delete']
group_permissions = {'media': ['partner', 'activity', 'presenter'],
                     'fr': ['partner'],
                     'experience': ['activity', 'presenter'], 'graphics': [],
                     'venue': [], 'speakers': ['presenter', 'activity']}


class Command(BaseCommand):
    help = 'Create group permissions.'

    def handle(self, *args, **kwargs):
        for group in group_permissions.keys():
            new_group, created = Group.objects.get_or_create(name=group)
            for model in group_permissions[group]:
                if (model == 'partner'):
                    ct = ContentType.objects.get_for_model(Partner)
                elif (model == 'activity'):
                    ct = ContentType.objects.get_for_model(Activity)
                elif (model == 'presenter'):
                    ct = ContentType.objects.get_for_model(Presenter)
                for permission in PERMISSIONS:
                    name = 'Can {} {}'.format(permission, model)
                    model_add_perm, _ = Permission.objects.get_or_create(
                                            name=name, content_type=ct)
                    new_group.permissions.add(model_add_perm)
