# Generated by Django 4.0.6 on 2022-07-25 03:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('application', '0009_containers_rel_order'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='containers',
            name='amount',
        ),
        migrations.RemoveField(
            model_name='containers',
            name='codespc',
        ),
        migrations.RemoveField(
            model_name='containers',
            name='condstat',
        ),
        migrations.RemoveField(
            model_name='containers',
            name='datespc',
        ),
        migrations.RemoveField(
            model_name='containers',
            name='description',
        ),
        migrations.RemoveField(
            model_name='containers',
            name='dms',
        ),
        migrations.RemoveField(
            model_name='containers',
            name='dt_dstf',
        ),
        migrations.RemoveField(
            model_name='containers',
            name='dt_stf',
        ),
        migrations.RemoveField(
            model_name='containers',
            name='estinumb',
        ),
        migrations.RemoveField(
            model_name='containers',
            name='in_apr',
        ),
        migrations.RemoveField(
            model_name='containers',
            name='inp',
        ),
        migrations.RemoveField(
            model_name='containers',
            name='manuf',
        ),
        migrations.RemoveField(
            model_name='containers',
            name='no',
        ),
        migrations.RemoveField(
            model_name='containers',
            name='off_hire',
        ),
        migrations.RemoveField(
            model_name='containers',
            name='on_date',
        ),
        migrations.RemoveField(
            model_name='containers',
            name='out_apr',
        ),
        migrations.RemoveField(
            model_name='containers',
            name='out_description',
        ),
        migrations.RemoveField(
            model_name='containers',
            name='outp',
        ),
        migrations.RemoveField(
            model_name='containers',
            name='prefix',
        ),
        migrations.RemoveField(
            model_name='containers',
            name='rel',
        ),
        migrations.RemoveField(
            model_name='containers',
            name='rep_date',
        ),
        migrations.RemoveField(
            model_name='containers',
            name='res',
        ),
        migrations.RemoveField(
            model_name='containers',
            name='st_out',
        ),
        migrations.RemoveField(
            model_name='containers',
            name='ton',
        ),
        migrations.RemoveField(
            model_name='containers',
            name='vent',
        ),
    ]
