from django.db import models
from orders.models import FoodOrder

class Payment(models.Model):
    order = models.OneToOneField(FoodOrder, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=50, default='Pending')  # e.g., Pending, Completed
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment for Order {self.order.id}"