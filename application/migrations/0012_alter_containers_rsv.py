# Generated by Django 4.0.6 on 2022-07-25 06:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('application', '0011_containers_reservation_date_containers_reserved_on_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='containers',
            name='rsv',
            field=models.BooleanField(default=False),
        ),
    ]
