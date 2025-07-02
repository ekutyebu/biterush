from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token
from .models import UserProfile
from .serializers import UserProfileSerializer
import logging

logger = logging.getLogger(__name__)

class GetCSRFToken(APIView):
    def get(self, request):
        csrf_token = get_token(request)
        logger.info(f"CSRF token generated for session: {request.session.session_key}")
        return Response({'csrfToken': csrf_token}, status=status.HTTP_200_OK)

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            if not request.user.is_authenticated:
                logger.warning("Unauthenticated user attempted to access UserProfileView")
                return Response({'error': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
            profile, created = UserProfile.objects.get_or_create(user=request.user)
            serializer = UserProfileSerializer(profile)
            logger.info(f"Profile retrieved for user: {request.user.username}, created: {created}")
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Error in UserProfileView.get: {str(e)}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        next_url = request.data.get('next') or '/'
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            logger.info(f"User {username} logged in successfully, sessionid: {request.session.session_key}")
            return Response({'status': 'Login successful', 'next': next_url, 'sessionid': request.session.session_key}, status=status.HTTP_200_OK)
        logger.warning(f"Failed login attempt for username: {username}")
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(APIView):
    def post(self, request):
        try:
            session_key = request.session.session_key
            logout(request)
            logger.info(f"User logged out successfully, sessionid: {session_key}")
            return Response({'status': 'Logout successful'}, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Error in LogoutView.post: {str(e)}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
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