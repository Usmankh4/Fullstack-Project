# Generated by Django 5.0.1 on 2024-03-04 01:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0013_phonebrand'),
    ]

    operations = [
        migrations.AlterField(
            model_name='phonebrand',
            name='logo',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]
