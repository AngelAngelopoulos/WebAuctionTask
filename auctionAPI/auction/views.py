from decimal import Decimal

import django_filters
from django.shortcuts import render

# Create your views here.
from django.utils.datetime_safe import datetime
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions, serializers, viewsets, filters, status

from auction.models import AuctionItem, Bid

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class ItemSerializer(serializers.ModelSerializer):
    bids = serializers.SerializerMethodField()  # BidSerializer(many=True, read_only=True)

    class Meta:
        model = AuctionItem
        fields = ['id', 'name', 'description', 'current_price', 'photo', 'date_open_auction',
                  'date_close_auction', 'state', 'bids']

    def get_bids(self, instance):
        bids = instance.bids.all().order_by('-date')
        return BidSerializer(bids, many=True).data


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


# ViewSets define the view behavior.
class ItemViewSet(viewsets.ModelViewSet):
    queryset = AuctionItem.objects.all()
    serializer_class = ItemSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']
    ordering_fields = ['current_price']
    ordering = ['current_price']
    pagination_class = StandardResultsSetPagination

    permission_classes_by_action = {
        'create': [IsAdminUser],
        'destroy': [IsAdminUser],
        'retrieve': [IsAuthenticated],
        'update': [IsAdminUser],
        'partial_update': [IsAdminUser],
        'list': [IsAuthenticated]
    }

    def create(self, request, *args, **kwargs):
        return super(ItemViewSet, self).create(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        return super(ItemViewSet, self).destroy(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        return super(ItemViewSet, self).retrieve(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        return super(ItemViewSet, self).update(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        return super(ItemViewSet, self).partial_update(request, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        return super(ItemViewSet, self).list(request, *args, **kwargs)

    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return [permission() for permission in self.permission_classes]


class BidSerializer(serializers.ModelSerializer):
    item_id = ItemSerializer
    date = serializers.DateTimeField()
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        model = Bid
        fields = ['user_id', 'item_id', 'date', 'amount']

    def validate(self, data):
        item_req = data['item_id']
        new_price = data['amount']
        item = AuctionItem.objects.get(id=item_req.id)
        highest_bids = Bid.objects.filter(amount=item.current_price)
        if new_price <= item.current_price:
            raise serializers.ValidationError(
                {"amount": "The bid amount should be greater than current price of item"})
        for bids in highest_bids:
            if data['user_id'].id == bids.user_id.id:
                raise serializers.ValidationError(
                    {"user": "The same user cannot make a bid twice in the same item if there is no another bid"})
        return data

    def create(self, validated_data):
        bid = Bid.objects.create(**validated_data)
        item_id = validated_data['item_id']
        new_price = Decimal(validated_data['amount'])
        item = AuctionItem.objects.get(id=item_id.id)
        item.current_price = new_price
        item.save()
        return bid


class BidViewSet(viewsets.ModelViewSet):
    queryset = Bid.objects.all()
    serializer_class = BidSerializer
    filter_backends = [filters.OrderingFilter]
    ordering = ['-date']

    permission_classes_by_action = {
        'create': [IsAuthenticated],
        'destroy': [IsAdminUser],
        'retrieve': [IsAuthenticated],
        'update': [IsAdminUser],
        'partial_update': [IsAdminUser],
        'list': [IsAdminUser]
    }

    def create(self, request, *args, **kwargs):
        return super(BidViewSet, self).create(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        return super(BidViewSet, self).destroy(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        return super(BidViewSet, self).retrieve(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        return super(BidViewSet, self).update(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        return super(BidViewSet, self).partial_update(request, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        return super(BidViewSet, self).list(request, *args, **kwargs)

    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return [permission() for permission in self.permission_classes]


class TokenPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['user_id'] = user.id
        token['name'] = user.username
        token['is_staff'] = user.is_staff
        token['is_admin'] = user.is_superuser
        # ...

        return token


class TokenPairView(TokenObtainPairView):
    serializer_class = TokenPairSerializer
