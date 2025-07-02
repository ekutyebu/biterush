from rest_framework import serializers
from .models import Service, TableBooking

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['restaurant', 'service_type', 'details']

class TableBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = TableBooking
        fields = ['id', 'user', 'restaurant', 'booking_time', 'party_size', 'status', 'created_at']