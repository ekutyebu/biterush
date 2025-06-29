from django.db import models
from restaurants.models import Restaurant

class Service(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='services')
    service_type = models.CharField(max_length=100)  # e.g., Delivery, Dine-in, Takeout
    details = models.TextField(blank=True)  # e.g., Delivery hours, fees

    def __str__(self):
        return f"{self.service_type} at {self.restaurant.name}"