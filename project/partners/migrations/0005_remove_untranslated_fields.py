# Generated by Django 2.1.2 on 2019-02-15 19:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('partners', '0004_auto_20181206_1332'),
    ]

    operations = [
        migrations.CreateModel(
            name='PartnerTranslation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('language_code', models.CharField(db_index=True, max_length=15, verbose_name='Language')),
                ('name', models.CharField(max_length=255, verbose_name='name')),
            ],
            options={
                'verbose_name': 'partner Translation',
                'db_table': 'partners_partner_translation',
                'db_tablespace': '',
                'managed': True,
                'default_permissions': (),
            },
        ),
        migrations.RemoveField(
            model_name='partner',
            name='name',
        ),
        migrations.AddField(
            model_name='partnertranslation',
            name='master',
            field=models.ForeignKey(editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='translations', to='partners.Partner'),
        ),
        migrations.AlterUniqueTogether(
            name='partnertranslation',
            unique_together={('language_code', 'master')},
        ),
    ]
