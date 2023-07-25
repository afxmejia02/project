# Generated by Django 4.2.1 on 2023-07-11 20:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_product_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='purchaseorder',
            name='BuyerId',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='api.user'),
        ),
        migrations.AddField(
            model_name='purchaseorder',
            name='BuyerName',
            field=models.CharField(default='', max_length=1000),
        ),
    ]
