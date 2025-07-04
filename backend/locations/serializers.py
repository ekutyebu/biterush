from rest_framework import serializers
from .models import Location

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['restaurant', 'address', 'city', 'country', 'latitude', 'longitude']