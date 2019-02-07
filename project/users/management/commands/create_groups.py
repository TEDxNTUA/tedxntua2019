from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from project.partners.models import Partner
from project.program.models import Activity, Presenter

PERMISSIONS = ['view', 'edit', 'add', 'delete']
permissions = {'media': ['partner'], 'fr': ['partner'],
               'experience': ['activity', 'presenter'], 'graphics': [],
               'venue': [], 'speakers': ['presenter']}


class Command(BaseCommand):
    help = 'Create group permissions.'

    def handle(self, *args, **kwargs):
        for group in permissions.keys():
            new_group, created = Group.objects.get_or_create(name=group)
            for model in permissions[group]:
                if (model == 'partner'):
                    ct = ContentType.objects.get_for_model(Partner)
                elif (model == 'activity'):
                    ct = ContentType.objects.get_for_model(Activity)
                else:
                    ct = ContentType.objects.get_for_model(Presenter)
                for permission in PERMISSIONS:
                    name = 'Can {} {}'.format(permission, model)
                    try:
                        model_add_perm = Permission.objects.get(name=name,
                                                                content_type=
                                                                ct)
                    except:
                        model_add_perm = Permission.objects.create(name=name,
                                                                   content_type
                                                                   =ct)
                    new_group.permissions.add(model_add_perm)
