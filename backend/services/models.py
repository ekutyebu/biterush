from django.db import models
from django.contrib.auth.models import User
from restaurants.models import Restaurant
from django.utils import timezone

class Service(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, default="Default Service")
    description = models.TextField(default="No description provided")

    def __str__(self):
        return self.name

class TableBooking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='service_bookings')
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='service_bookings')
    date_time = models.DateTimeField(default=timezone.now)
    party_size = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Booking {self.id} by {self.user.username}"