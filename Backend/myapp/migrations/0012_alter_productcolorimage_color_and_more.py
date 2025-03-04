# Generated by Django 5.0.1 on 2024-03-03 00:33

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0011_productcolorimage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productcolorimage',
            name='color',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='product_images', to='myapp.color'),
        ),
        migrations.AlterField(
            model_name='productcolorimage',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
        migrations.AlterField(
            model_name='productcolorimage',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='color_images', to='myapp.product'),
        ),
    ]
