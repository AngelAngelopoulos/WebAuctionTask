from django.contrib import admin

# Register your models here.
from auction.models import AuctionItem, Bid

admin.site.register(AuctionItem)
admin.site.register(Bid)