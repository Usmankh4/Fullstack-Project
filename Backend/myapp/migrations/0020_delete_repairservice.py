# Generated by Django 5.0.1 on 2024-03-06 00:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0019_rename_service_name_repairservice_service_type_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='RepairService',
        ),
    ]
