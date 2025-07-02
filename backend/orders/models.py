from django.db import models
from django.contrib.auth.models import User
from restaurants.models import Restaurant
from django.utils import timezone

class FoodOrder(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    items = models.ManyToManyField('menus.MenuItem')
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.id} by {self.user.username}"

class TableBooking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='order_bookings')
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='order_bookings')
    date_time = models.DateTimeField(default=timezone.now)
    party_size = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Booking {self.id} by {self.user.username}"