from collections import OrderedDict

from django.db import models
from django.dispatch import receiver

from versatileimagefield.fields import VersatileImageField
from versatileimagefield.image_warmer import VersatileImageFieldWarmer
from parler.models import TranslatableModel, TranslatedFields
from parler.managers import TranslatableQuerySet, TranslatableManager


class TeamMemberManager(TranslatableManager):

    def get_teams(self):
        '''Table-level method to get all team members grouped by team.

        Returns a dictionary where team IDs from TeamMember.TEAM_CHOICES
        are the keys and the value is a dictionary with the `title` of
        the team and a `members` array.

        The order of teams is the same as in TEAM_CHOICES.
        '''
        teams = OrderedDict()
        for team_id, title in TeamMember.TEAM_CHOICES:
            teams[team_id] = {
                'title': title,
                'members': [],
            }

        for member in self.get_queryset():
            teams[member.team]['members'].append(member)
        return teams


class TeamMember(TranslatableModel):
    '''Model for members of the TEDxNTUA 2019 organizing team.

    The `team` attribute is represented as a CharField with limited possible
    values. The definition follows the official documentation example:
    https://docs.djangoproject.com/en/2.1/ref/models/fields/#choices
    '''
    EXPERIENCE = 'experience'
    IT = 'it'
    FUNDRAISING = 'fundraising'
    GRAPHICS = 'graphics'
    MEDIA = 'media'
    SPEAKERS = 'speakers'
    VENUE_PRODUCTION = 'venue-production'
    TEAM_CHOICES = (
        (EXPERIENCE, 'Experience'),
        (IT, 'IT'),
        (FUNDRAISING, 'Fundraising'),
        (GRAPHICS, 'Graphics'),
        (MEDIA, 'Media'),
        (SPEAKERS, 'Speakers'),
        (VENUE_PRODUCTION, 'Venue & Production'),
    )
    translations = TranslatedFields(
        first=models.CharField(max_length=255, verbose_name='First name'),
        last=models.CharField(max_length=255, verbose_name='Last name')
    )
    email = models.EmailField()
    team = models.CharField(max_length=16, choices=TEAM_CHOICES)

    image = VersatileImageField(
        'Image',
        upload_to='team/',
        width_field='image_width',
        height_field='image_height'
    )
    image_height = models.PositiveIntegerField(editable=False, null=True)
    image_width = models.PositiveIntegerField(editable=False, null=True)

    image_fun = VersatileImageField(
        'Image',
        upload_to='team/',
        width_field='image_width',
        height_field='image_height'
    )
    image_fun_height = models.PositiveIntegerField(editable=False, null=True)
    image_fun_width = models.PositiveIntegerField(editable=False, null=True)

    objects = TeamMemberManager()

    @property
    def fullname(self):
        '''
        Fullname is not stored in the database, but is instead a "computed"
        value derived from the first and last attributes.
        The @property decorator in Python classes enables us to access the
        value like a normal property (e.g. `print(member.fullname)`).
        '''
        return ' '.join([self.first, self.last])

    def __str__(self):
        '''Objects of the TeamMember class are represented as strings by
        their fullname property
        '''
        return self.fullname


@receiver(models.signals.post_save, sender=TeamMember)
def warm_team_member_images(sender, instance, **kwargs):
    '''Ensures images are created post-save.
    Image sizes are stored in base.VERSATILEIMAGEFIELD_RENDITION_KEY_SETS.
    Using a thumbnail__AxA rendition key, the image fits in a AxA rectangle by
    maintaining the aspect ratio.

    Documentation link:
    https://django-versatileimagefield.readthedocs.io/en/latest/overview.html#create-images-wherever-you-need-them
    '''

    img_warmer = VersatileImageFieldWarmer(
        instance_or_queryset=instance,
        rendition_key_set='Sizes',
        image_attr='image',
        verbose=True
    )
    num_created, failed_to_create = img_warmer.warm()
