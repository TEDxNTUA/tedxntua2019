from django.db import models
from django.dispatch import receiver
import logging
logger = logging.getLogger(__name__)

from versatileimagefield.fields import VersatileImageField
from versatileimagefield.image_warmer import VersatileImageFieldWarmer

class SpeakerManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(activity__activity_type=Activity.TALK)

class PerformerManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(activity__activity_type=Activity.PERFORMANCE)

class WorkshopPresenterManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(activity__activity_type=Activity.WORKSHOP)

class Presenter(models.Model):
    '''Person that participates in the event as a guest,
    ie. a speaker, a performer, a workshop presenter or a host.

    First and last name are the only required fields.
    '''

    first = models.CharField(max_length=255, verbose_name='First name')
    last = models.CharField(max_length=255, verbose_name='Last name')

    occupation = models.CharField(max_length=255, blank=True)
    short_bio = models.TextField(blank=True, verbose_name='Short bio')
    quote = models.CharField(max_length=255, blank=True, verbose_name='Inspirational quote')
    link = models.URLField(blank=True, verbose_name='Website or social media profile')

    image = VersatileImageField(
        'Image',
        upload_to='static/',
        width_field='image_width',
        height_field='image_height'
    )
    image_height = models.PositiveIntegerField(editable=False, null=True)
    image_width = models.PositiveIntegerField(editable=False, null=True)

    '''Managers are an easy way to create custom filters for queries.

    If a models.Manager() is declared in a model, then the `objects` default manager
    is discarded. We added it explicitly in case it comes in handy.

    Documentation link:
    https://docs.djangoproject.com/el/2.1/topics/db/managers/
    '''
    objects = models.Manager()
    speakers = SpeakerManager()
    performers = PerformerManager()
    workshop_presenters = WorkshopPresenterManager()

    @property
    def fullname(self):
        return ' '.join([self.first, self.last])

    def __str__(self):
        return self.fullname

@receiver(models.signals.post_save, sender=Presenter)
def WarmPresenterImages(sender, instance, **kwargs):
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

class TalkManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(activity_type=Activity.TALK)

class PerformanceManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(activity_type=Activity.PERFORMANCE)

class WorkshopManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(activity_type=Activity.WORKSHOP)

class Activity(models.Model):
    '''A thing happening in the event, ie. a talk, a performance,
    a workshop or the hosting of the event.
    '''

    TALK = 'T'
    PERFORMANCE = 'P'
    WORKSHOP = 'W'
    HOSTING = 'H'
    TYPE_CHOICES = (
        (TALK, 'Talk'),
        (PERFORMANCE, 'Performance'),
        (WORKSHOP, 'Workshop'),
        (HOSTING, 'Hosting'),
    )

    activity_type = models.CharField(max_length=1, choices=TYPE_CHOICES, verbose_name='Type')

    start = models.TimeField()
    end = models.TimeField()

    title = models.CharField(max_length=255)
    subtitle = models.TextField()
    description = models.TextField()

    image = VersatileImageField(
        'Image',
        upload_to='static/',
        width_field='image_width',
        height_field='image_height',
        null=True,
        blank=True
    )
    image_height = models.PositiveIntegerField(editable=False, null=True)
    image_width = models.PositiveIntegerField(editable=False, null=True)


    '''An activity may be presented by many people and a presenter
    may present many activities respectively

    Documentation for many-to-many relationships may be found here:
    https://docs.djangoproject.com/el/2.1/topics/db/examples/many_to_many/
    '''
    presenters = models.ManyToManyField(Presenter)

    objects = models.Manager()
    talks = TalkManager()
    performances = PerformanceManager()
    workshops = WorkshopManager()

    def __str__(self):
        '''String representation of an activity.

        get_FOO_display() returns the display value of a `choices` CharField.
        https://docs.djangoproject.com/el/2.1/ref/models/instances/#django.db.models.Model.get_FOO_display
        '''
        return f'{self.title} ({self.get_activity_type_display()})'

    class Meta:
        verbose_name_plural = 'Activities'

@receiver(models.signals.post_save, sender=Activity)
def WarmActivityImages(sender, instance, **kwargs):
    '''Ensures images are created post-save.
    Image sizes are stored in base.VERSATILEIMAGEFIELD_RENDITION_KEY_SETS.
    Using a thumbnail__AxA rendition key, the image fits in a AxA rectangle by
    maintaining the aspect ratio.

    Documentation link:
    https://django-versatileimagefield.readthedocs.io/en/latest/overview.html#create-images-wherever-you-need-them
    '''
    if instance.image is not None:
        img_warmer = VersatileImageFieldWarmer(
            instance_or_queryset=instance,
            rendition_key_set='Sizes',
            image_attr='image',
            verbose=True
        )

        num_created, failed_to_create = img_warmer.warm()
    else:
        logger.info("No image file added for this activity")
