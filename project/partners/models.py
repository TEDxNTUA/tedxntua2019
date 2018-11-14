from django.db import models

class Partner(models.Model):
    '''Model for partners of the TEDxNTUA 2019 organization.

    The `type` attribute is represented as a CharField with limited possible
    values. The definition follows the official documentation example:
    https://docs.djangoproject.com/en/2.1/ref/models/fields/#choices

    The `link` attribute is represented as a URLField. The definition follows
    the official documentation example:
    https://docs.djangoproject.com/en/2.1/ref/models/fields/#urlfield
    '''
    GRAND_SPONSORS_PLUS = 'GSP'
    GRAND_SPONSORS = 'GS'
    SPONSORS = 'SPO'
    SUPPORTERS = 'SUP'
    PARTNER_TYPES = (
        (GRAND_SPONSORS_PLUS, 'Grand sponsors plus'),
        (GRAND_SPONSORS, 'Grand sponsors'),
        (SPONSORS, 'Sponsors'),
        (SUPPORTERS, 'Supporters'),
    )

    name = models.CharField(max_length=255, verbose_name='name')
    type = models.CharField(max_length=3, choices=PARTNER_TYPES)
    link = models.URLField()

    def __str__(self):
        '''Objects of the Partner class are represented as strings by
        their name
        '''
        return self.name
