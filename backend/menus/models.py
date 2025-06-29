from django.db import models
from restaurants.models import Restaurant

class MenuItem(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='menu_items')
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=100, blank=True)  # e.g., Appetizer, Main, Dessert

    def __str__(self):
        return f"{self.name} at {self.restaurant.name}"