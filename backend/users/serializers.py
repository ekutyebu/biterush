from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['user', 'preferences']

# from rest_framework import serializers
# from django.contrib.auth import authenticate
# from .models import User

# class UserRegisterSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(write_only=True)
    
#     class Meta:
#         model = User
#         fields = ['email', 'password', 'user_type', 'phone_number', 'first_name', 'last_name']
        
#     def create(self, validated_data):
#         user = User.objects.create_user(
#             email=validated_data['email'],
#             password=validated_data['password'],
#             username=validated_data['email'],  # Using email as username
#             **{k: v for k, v in validated_data.items() if k != 'email' and k != 'password'}
#         )
#         return user

# class UserLoginSerializer(serializers.Serializer):
#     email = serializers.EmailField()
#     password = serializers.CharField(write_only=True)
    
#     def validate(self, data):
#         user = authenticate(username=data['email'], password=data['password'])
#         if not user:
#             raise serializers.ValidationError("Invalid credentials")
#         return user