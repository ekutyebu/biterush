from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class User(AbstractUser):
    USER_TYPE_CHOICES = (
        (1, 'Customer'),
        (2, 'Restaurant Owner'),
        (3, 'Admin'),
    )
    
    user_type = models.PositiveSmallIntegerField(choices=USER_TYPE_CHOICES, default=1)
    phone_number = models.CharField(max_length=20)
    address = models.TextField(null=True, blank=True)
    profile_picture = models.ImageField(upload_to='profiles/', null=True, blank=True)
    favorites = models.ManyToManyField('restaurants.Restaurant', blank=True)
    
    def __str__(self):
        return self.email