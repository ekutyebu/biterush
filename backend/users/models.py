from django.db import models
from django.contrib.auth.models import User
import json

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    preferences = models.TextField(default='{}')  # JSON-based knowledge graph

    def update_preferences(self, key, value):
        prefs = json.loads(self.preferences)
        prefs[key] = value  # e.g., {"favorite_cuisine": "Italian", "preferred_location": "New York"}
        self.preferences = json.dumps(prefs)
        self.save()

    def __str__(self):
        return f"{self.user.username}'s Profile"

# from django.db import models
# from django.contrib.auth.models import AbstractUser


# # Create your models here.
# class User(AbstractUser):
#     USER_TYPE_CHOICES = (
#         (1, 'Customer'),
#         (2, 'Restaurant Owner'),
#         (3, 'Admin'),
#     )
    
#     user_type = models.PositiveSmallIntegerField(choices=USER_TYPE_CHOICES, default=1)
#     phone_number = models.CharField(max_length=20)
#     address = models.TextField(null=True, blank=True)
#     profile_picture = models.ImageField(upload_to='profiles/', null=True, blank=True)
#     favorites = models.ManyToManyField('restaurants.Restaurant', blank=True)
    
#     def __str__(self):
#         return self.email