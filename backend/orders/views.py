from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from twilio.rest import Client
from restaurants.models import Restaurant
from menus.models import MenuItem
import os
import logging
import re

logger = logging.getLogger(__name__)

class VoiceSearchView(APIView):
    def post(self, request):
        voice_input = request.data.get('voice_input')
        if not voice_input:
            logger.warning("No voice input provided in VoiceSearchView")
            return Response({'error': 'Voice input is required'}, status=status.HTTP_400_BAD_REQUEST)
          
        try:
            # Simple keyword-based search on internal database
            cuisine = re.search(r'italian|chinese|vegan|indian', voice_input.lower())
            cuisine = cuisine.group(0) if cuisine else None
            results = []
            if cuisine:
                restaurants = Restaurant.objects.filter(cuisine__icontains=cuisine)
                for restaurant in restaurants:
                    menu_items = MenuItem.objects.filter(restaurant=restaurant)
                    results.append({
                        'restaurant': restaurant.name,
                        'menu_items': [{'name': item.name, 'price': str(item.price)} for item in menu_items]
                      })
            logger.info(f"Voice search results for '{voice_input}': {len(results)} restaurants found")
            return Response({'results': results}, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Voice search error: {str(e)}")
            return Response({'error': 'Failed to process voice search'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class OrderNotificationView(APIView):
    def post(self, request):
        order_id = request.data.get('order_id')
        phone_number = request.data.get('phone_number')
        message = request.data.get('message', f'Your order #{order_id} has been confirmed!')
          
        try:
            twilio_account_sid = os.getenv('TWILIO_ACCOUNT_SID')
            twilio_auth_token = os.getenv('TWILIO_AUTH_TOKEN')
            twilio_phone_number = os.getenv('TWILIO_PHONE_NUMBER')
            client = Client(twilio_account_sid, twilio_auth_token)
              
            sms = client.messages.create(
                body=message,
                from_=twilio_phone_number,
                to=phone_number
            )
            logger.info(f"SMS sent for order {order_id}: {sms.sid}")
            return Response({'status': 'SMS sent', 'sid': sms.sid}, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Twilio SMS error: {str(e)}")
            return Response({'error': 'Failed to send SMS'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)