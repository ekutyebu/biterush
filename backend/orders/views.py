from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import FoodOrder
from .serializers import FoodOrderSerializer

class FoodOrderView(APIView):
    def post(self, request):
        serializer = FoodOrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)