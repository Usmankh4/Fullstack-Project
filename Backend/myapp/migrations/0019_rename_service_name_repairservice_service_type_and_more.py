# Generated by Django 5.0.1 on 2024-03-06 00:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0018_repairservice'),
    ]

    operations = [
        migrations.RenameField(
            model_name='repairservice',
            old_name='service_name',
            new_name='service_type',
        ),
        migrations.AddField(
            model_name='repairservice',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='repairservice',
            name='price',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
    ]
