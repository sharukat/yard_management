# Generated by Django 4.0.6 on 2022-07-17 08:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('application', '0006_customers'),
    ]

    operations = [
        migrations.AddField(
            model_name='containers',
            name='bl_number',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='containers',
            name='c_location',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='containers',
            name='p_location',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='containers',
            name='vessel',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='containers',
            name='voyage',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
