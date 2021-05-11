from datetime import datetime

from django.contrib.auth.models import User
from django.db import models


class AuctionItem(models.Model):
    class State(models.TextChoices):
        OPEN = 'OPEN'
        CLOSED = 'CLOSED'
        PAUSED = 'PAUSED'
        CANCELED = 'CANCELED'

    name = models.CharField(max_length=255, null=False, blank=False)
    description = models.TextField(null=True, blank=True)
    current_price = models.DecimalField(default=0, max_digits=10, decimal_places=2, null=False, blank=False)
    photo = models.CharField(max_length=255, null=True, blank=True)
    date_open_auction = models.DateTimeField(default=datetime.now, blank=False, null=False)
    date_close_auction = models.DateTimeField(default=datetime.now, blank=False, null=False)
    state = models.CharField(choices=State.choices, max_length=8, default=State.choices[0])

    def __str__(self):
        return f"Item no {self.id}: {self.name}"


class Bid(models.Model):
    user_id = models.ForeignKey(User, related_name='bids', on_delete=models.CASCADE, null=False)
    item_id = models.ForeignKey(AuctionItem, related_name='bids', on_delete=models.CASCADE, null=False)
    date = models.DateTimeField(default=datetime.now, blank=False, null=False)
    amount = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False)

