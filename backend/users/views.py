from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import UserProfile
from .serializers import UserProfileSerializer

class UserProfileView(APIView):
    def get(self, request):
        profile, _ = UserProfile.objects.get_or_create(user=request.user)
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)

    def post(self, request):
        profile, _ = UserProfile.objects.get_or_create(user=request.user)
        key = request.data.get('key')
        value = request.data.get('value')
        profile.update_preferences(key, value)
        return Response({'status': 'Preferences updated'}, status=status.HTTP_200_OK)



# from django.shortcuts import render
# from rest_framework import generics, permissions, status
# from rest_framework.response import Response
# from rest_framework.authtoken.models import Token
# from .serializers import UserRegisterSerializer, UserLoginSerializer

# # Create your views here.
# class RegisterView(generics.CreateAPIView):
#     serializer_class = UserRegisterSerializer
#     permission_classes = [permissions.AllowAny]
    
#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.save()
#         token = Token.objects.create(user=user)
#         return Response({
#             'user': serializer.data,
#             'token': token.key
#         }, status=status.HTTP_201_CREATED)

# class LoginView(generics.GenericAPIView):
#     serializer_class = UserLoginSerializer
#     permission_classes = [permissions.AllowAny]
    
#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.validated_data
#         token, created = Token.objects.get_or_create(user=user)
#         return Response({
#             'token': token.key,
#             'user_id': user.pk,
#             'email': user.email,
#             'user_type': user.get_user_type_display()
#         })

# class LogoutView(generics.GenericAPIView):
#     permission_classes = [permissions.IsAuthenticated]
    
#     def post(self, request, *args, **kwargs):
#         request.user.auth_token.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)