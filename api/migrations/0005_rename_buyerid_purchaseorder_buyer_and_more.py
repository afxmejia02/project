# Generated by Django 4.2.1 on 2023-07-11 20:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_purchaseorder_buyerid_purchaseorder_buyername'),
    ]

    operations = [
        migrations.RenameField(
            model_name='purchaseorder',
            old_name='BuyerId',
            new_name='Buyer',
        ),
        migrations.RemoveField(
            model_name='purchaseorder',
            name='BuyerName',
        ),
        migrations.AddField(
            model_name='product',
            name='Seller',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='api.user'),
        ),
    ]