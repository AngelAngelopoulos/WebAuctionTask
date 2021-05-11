# Generated by Django 3.2.1 on 2021-05-06 07:19

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='AuctionItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('current_price', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('min_price', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('max_price', models.DecimalField(decimal_places=2, max_digits=10, null=True)),
                ('photo', models.CharField(max_length=255)),
                ('date_open_auction', models.DateTimeField(default=datetime.datetime.now)),
                ('date_close_auction', models.DateTimeField(default=datetime.datetime.now)),
                ('state', models.CharField(choices=[('OPEN', 'Open'), ('CLOSED', 'Closed'), ('PAUSED', 'Paused'), ('CANCELED', 'Canceled')], default=('OPEN', 'Open'), max_length=8)),
            ],
        ),
        migrations.CreateModel(
            name='Bid',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(default=datetime.datetime.now)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('item_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='auction.auctionitem')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bids', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]