from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Restaurant
from .serializers import RestaurantSerializer

class RestaurantCreateView(APIView):
    def post(self, request):
        serializer = RestaurantSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# from rest_framework import generics, permissions, status
# from rest_framework.response import Response
# from .models import Restaurant, MenuCategory, MenuItem
# from .serializers import RestaurantSerializer, MenuCategorySerializer, MenuItemSerializer
# from users.models import User
# from rest_framework import permissions


# # Create your views here.
# class IsRestaurantOwner(permissions.BasePermission):
#     """
#     Custom permission to only allow restaurant owners to edit their restaurant.
#     """
#     def has_object_permission(self, request, view, obj):
#         return hasattr(obj, 'owner') and obj.owner == request.user

# class RestaurantListCreateView(generics.ListCreateAPIView):
#     serializer_class = RestaurantSerializer
#     permission_classes = [permissions.IsAuthenticated]
    
#     def get_queryset(self):
#         user = self.request.user
#         if user.user_type == 2:  # Restaurant owner
#             return Restaurant.objects.filter(owner=user)
#         return Restaurant.objects.filter(is_active=True)
    
#     def perform_create(self, serializer):
#         serializer.save(owner=self.request.user)

# class RestaurantDetailView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Restaurant.objects.all()
#     serializer_class = RestaurantSerializer
#     permission_classes = [permissions.IsAuthenticated]
    
#     def get_permissions(self):
#         if self.request.method in ['PUT', 'PATCH', 'DELETE']:
#             return [permissions.IsAuthenticated(), IsRestaurantOwner()]
#         return super().get_permissions()

# class MenuCategoryCreateView(generics.CreateAPIView):
#     serializer_class = MenuCategorySerializer
#     permission_classes = [permissions.IsAuthenticated, IsRestaurantOwner]
    
#     def perform_create(self, serializer):
#         restaurant = Restaurant.objects.get(pk=self.kwargs['restaurant_id'])
#         serializer.save(restaurant=restaurant)

# class MenuItemCreateView(generics.CreateAPIView):
#     serializer_class = MenuItemSerializer
#     permission_classes = [permissions.IsAuthenticated, IsRestaurantOwner]
    
#     def perform_create(self, serializer):
#         category = MenuCategory.objects.get(pk=self.kwargs['category_id'])
#         serializer.save(category=category)