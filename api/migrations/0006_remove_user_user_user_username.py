# Generated by Django 4.2.1 on 2023-07-12 15:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_rename_buyerid_purchaseorder_buyer_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='User',
        ),
        migrations.AddField(
            model_name='user',
            name='UserName',
            field=models.CharField(default='', max_length=50, unique=True),
        ),
    ]