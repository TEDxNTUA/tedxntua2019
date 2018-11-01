from django.db import models

class TeamMember(models.Model):
    '''Model for members of the TEDxNTUA 2019 organizing team.

    The `team` attribute is represented as a CharField with limited possible
    values. The definition follows the official documentation example:
    https://docs.djangoproject.com/en/2.1/ref/models/fields/#choices
    '''
    EXPERIENCE = 'XP'
    IT = 'IT'
    FUNDRAISING = 'FR'
    GRAPHICS = 'GR'
    MEDIA = 'MD'
    SPEAKERS = 'SP'
    VENUE_PRODUCTION = 'VP'
    TEAM_CHOICES = (
        (EXPERIENCE, 'Experience'),
        (IT, 'IT'),
        (FUNDRAISING, 'Fundraising'),
        (GRAPHICS, 'Graphics'),
        (MEDIA, 'Media'),
        (SPEAKERS, 'Speakers'),
        (VENUE_PRODUCTION, 'Venue & Production'),
    )

    first = models.CharField(max_length=255, verbose_name='First name')
    last = models.CharField(max_length=255, verbose_name='Last name')
    email = models.EmailField()
    team = models.CharField(max_length=2, choices=TEAM_CHOICES)

    @property
    def fullname(self):
        '''Fullname is not stored in the database, but is instead a "computed"
        value derived from the first and last attributes.
        The @property decorator in Python classes enables us to access the value
        like a normal property (e.g. `print(member.fullname)`).
        '''
        return ' '.join([self.first, self.last])

    def __str__(self):
        '''Objects of the TeamMember class are represented as strings by
        their fullname property
        '''
        return self.fullname
