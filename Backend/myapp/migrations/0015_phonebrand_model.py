# Generated by Django 5.0.1 on 2024-03-04 02:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0014_alter_phonebrand_logo'),
    ]

    operations = [
        migrations.AddField(
            model_name='phonebrand',
            name='model',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
