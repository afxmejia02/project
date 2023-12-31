# Generated by Django 4.2.1 on 2023-07-07 20:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Address',
            fields=[
                ('Id', models.AutoField(primary_key=True, serialize=False)),
                ('City', models.CharField(max_length=100)),
                ('Department', models.CharField(max_length=100)),
                ('AddressInfo', models.CharField(max_length=500)),
            ],
        ),
        migrations.CreateModel(
            name='Card',
            fields=[
                ('Id', models.AutoField(primary_key=True, serialize=False)),
                ('Number', models.CharField(max_length=16, unique=True)),
                ('Balance', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
        ),
        migrations.CreateModel(
            name='Invoice',
            fields=[
                ('Id', models.AutoField(primary_key=True, serialize=False)),
                ('Date', models.DateField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Items',
            fields=[
                ('Id', models.AutoField(primary_key=True, serialize=False)),
                ('Units', models.PositiveIntegerField()),
                ('TotalPrice', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('Id', models.AutoField(primary_key=True, serialize=False)),
                ('Name', models.CharField(max_length=1000)),
                ('Categories', models.CharField(choices=[('CELULARES Y SMARTPHONES', 'Celulares y Smartphones'), ('TABLETS Y COMPUTADORES', 'Tablets y Computadores'), ('CÁMARAS', 'Cámaras'), ('ACCESORIOS', 'Accesorios'), ('CONSOLAS Y VIDEOJUEGOS', 'Consolas y Videojuegos'), ('TELEVISORES', 'Televisores')], max_length=100)),
                ('Image', models.ImageField(max_length=200, null=True, upload_to='static/')),
                ('Description', models.CharField(max_length=5000)),
                ('Price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('UnitsAvailable', models.PositiveIntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('Id', models.AutoField(primary_key=True, serialize=False)),
                ('Name', models.CharField(max_length=100)),
                ('Surname', models.CharField(max_length=100)),
                ('DocumentType', models.CharField(choices=[('RC', 'REGISTRO CIVIL DE NACIMIENTO'), ('TI', 'TARJETA DE IDENTIDAD'), ('CC', 'CEDULA DE CIUDADANIA'), ('TE', 'TARJETA DE EXTRANJERIA'), ('CE', 'CEDULA DE EXTRANJERIA'), ('NIT', 'NIT'), ('PAS', 'PASAPORTE')], max_length=100)),
                ('DocumentId', models.CharField(max_length=50)),
                ('Birthdate', models.DateField()),
                ('Email', models.CharField(max_length=100)),
                ('PhoneNumber', models.CharField(max_length=50)),
                ('User', models.CharField(max_length=50)),
                ('Password', models.CharField(max_length=100)),
                ('Address', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.address')),
            ],
        ),
        migrations.CreateModel(
            name='PurchaseOrder',
            fields=[
                ('Id', models.AutoField(primary_key=True, serialize=False)),
                ('Total', models.DecimalField(decimal_places=2, max_digits=10)),
                ('Card', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.card')),
                ('Items', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.items')),
            ],
        ),
        migrations.AddField(
            model_name='items',
            name='Product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.product'),
        ),
        migrations.CreateModel(
            name='InvoiceDetail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Amount', models.PositiveIntegerField()),
                ('Invoice', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.invoice')),
                ('Items', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.items')),
            ],
        ),
        migrations.AddField(
            model_name='invoice',
            name='Client',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.user'),
        ),
        migrations.AddField(
            model_name='invoice',
            name='Items',
            field=models.ManyToManyField(through='api.InvoiceDetail', to='api.items'),
        ),
        migrations.AddField(
            model_name='invoice',
            name='PurchaseOrder',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.purchaseorder'),
        ),
    ]
