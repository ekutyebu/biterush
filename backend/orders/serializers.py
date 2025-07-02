from rest_framework import serializers
from .models import FoodOrder, TableBooking
from menus.models import MenuItem

class FoodOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodOrder
        fields = ['restaurant', 'items', 'total_price']

class TableBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = TableBooking
        fields = ['restaurant', 'date_time', 'party_size']