from rest_framework import serializers
from .models import Restaurant, MenuCategory, MenuItem

class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = '__all__'
        read_only_fields = ('category',)

class MenuCategorySerializer(serializers.ModelSerializer):
    items = MenuItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = MenuCategory
        fields = '__all__'
        read_only_fields = ('restaurant',)

class RestaurantSerializer(serializers.ModelSerializer):
    categories = MenuCategorySerializer(many=True, read_only=True)
    owner = serializers.PrimaryKeyRelatedField(read_only=True)
    
    class Meta:
        model = Restaurant
        fields = '__all__'
    
    def validate(self, data):
        if self.instance is None and 'owner' not in data:
            raise serializers.ValidationError("Owner is required")
        return data