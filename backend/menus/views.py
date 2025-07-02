from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import MenuItem
from .serializers import MenuItemSerializer
import logging

logger = logging.getLogger(__name__)

class MenuItemCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = MenuItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            logger.info(f"Menu item created by user: {request.user.username}")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        logger.error(f"Menu item creation failed: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MenuItemListView(APIView):
    def get(self, request):
        try:
            restaurant_id = request.query_params.get('restaurant')
            if restaurant_id:
                menu_items = MenuItem.objects.filter(restaurant_id=restaurant_id)
            else:
                menu_items = MenuItem.objects.all()
            serializer = MenuItemSerializer(menu_items, many=True)
            logger.info(f"Retrieved {len(menu_items)} menu items")
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Error in MenuItemListView.get: {str(e)}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)