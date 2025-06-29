from django.db import models
from django.contrib.auth.models import User

class Restaurant(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


# from django.contrib.gis.db import models
# from django.contrib.auth import get_user_model

# User = get_user_model()

# class Restaurant(models.Model):
#     owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='restaurants')
#     name = models.CharField(max_length=255)
#     description = models.TextField()
#     location = models.PointField()
#     address = models.CharField(max_length=255)
#     delivery_radius = models.IntegerField(help_text="In meters")  # 0 means no delivery
#     opening_hours = models.JSONField(default=dict)
#     logo = models.ImageField(upload_to='restaurants/logos/')
#     banner = models.ImageField(upload_to='restaurants/banners/')
#     is_active = models.BooleanField(default=True)
#     created_at = models.DateTimeField(auto_now_add=True)
    
#     def __str__(self):
#         return self.name

# class MenuCategory(models.Model):
#     restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='categories')
#     name = models.CharField(max_length=100)
#     order = models.PositiveIntegerField(default=0)
    
#     class Meta:
#         ordering = ['order']
    
#     def __str__(self):
#         return f"{self.restaurant.name} - {self.name}"

# class MenuItem(models.Model):
#     category = models.ForeignKey(MenuCategory, on_delete=models.CASCADE, related_name='items')
#     name = models.CharField(max_length=255)
#     description = models.TextField(blank=True)
#     price = models.DecimalField(max_digits=8, decimal_places=2)
#     image = models.ImageField(upload_to='menu_items/', blank=True, null=True)
#     is_available = models.BooleanField(default=True)
#     preparation_time = models.PositiveIntegerField(help_text="In minutes")
#     dietary_tags = models.JSONField(default=list)  # ['vegetarian', 'gluten-free', etc.]
    
#     def __str__(self):
#         return self.name