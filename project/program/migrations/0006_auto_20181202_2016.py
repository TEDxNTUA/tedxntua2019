# Generated by Django 2.1.3 on 2018-12-02 20:16

from django.db import migrations, models
import versatileimagefield.fields


class Migration(migrations.Migration):

    dependencies = [
        ('program', '0005_auto_20181113_2337'),
    ]

    operations = [
        migrations.AddField(
            model_name='activity',
            name='image',
            field=versatileimagefield.fields.VersatileImageField(default='', height_field='image_height', upload_to='static/', verbose_name='Image', width_field='image_width'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='activity',
            name='image_height',
            field=models.PositiveIntegerField(blank=True, null=True, verbose_name='Image Height'),
        ),
        migrations.AddField(
            model_name='activity',
            name='image_width',
            field=models.PositiveIntegerField(blank=True, null=True, verbose_name='Image Width'),
        ),
        migrations.AddField(
            model_name='presenter',
            name='image',
            field=versatileimagefield.fields.VersatileImageField(default='', height_field='image_height', upload_to='static/', verbose_name='Image', width_field='image_width'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='presenter',
            name='image_height',
            field=models.PositiveIntegerField(blank=True, null=True, verbose_name='Image Height'),
        ),
        migrations.AddField(
            model_name='presenter',
            name='image_width',
            field=models.PositiveIntegerField(blank=True, null=True, verbose_name='Image Width'),
        ),
    ]