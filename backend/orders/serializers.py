from rest_framework import serializers
from .models import FoodOrder
from menus.models import MenuItem

class FoodOrderSerializer(serializers.ModelSerializer):
    items = serializers.PrimaryKeyRelatedField(queryset=MenuItem.objects.all(), many=True)

    class Meta:
        model = FoodOrder
        fields = ['id', 'user', 'restaurant', 'items', 'total_price', 'created_at']