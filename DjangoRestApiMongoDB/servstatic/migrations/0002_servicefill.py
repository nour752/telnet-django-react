# Generated by Django 3.2.10 on 2022-07-24 15:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('servstatic', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ServiceFill',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('id_project', models.CharField(default='', max_length=200)),
                ('service_name', models.CharField(default='', max_length=200)),
                ('params', models.CharField(default='', max_length=200)),
            ],
        ),
    ]
