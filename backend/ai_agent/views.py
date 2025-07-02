from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from users.models import UserProfile
from restaurants.models import Restaurant
from restaurants.serializers import RestaurantSerializer
import requests
import json

class RestaurantSearchView(APIView):
    def post(self, request):
        query = request.data.get('query', '')
        api_key = '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'  # Replace with your Tavily API key
        # Get user preferences for personalization
        user = request.user
        profile = None
        if user.is_authenticated:
            profile, _ = UserProfile.objects.get_or_create(user=user)
            prefs = json.loads(profile.preferences)
            query += f" {prefs.get('favorite_cuisine', '')} {prefs.get('preferred_location', '')}"
        # Search restaurants using Tavily
        response = requests.post('https://api.tavily.com/search', json={
            'api_key': api_key,
            'query': f"restaurants {query}"
        })
        if response.status_code == 200:
            results = response.json()['results']
            restaurants = [{'name': r['title'], 'description': r['content']} for r in results]
            # Update user profile with preferences
            if user.is_authenticated and 'cuisine' in query.lower():
                profile.update_preferences('favorite_cuisine', query)
            return Response(restaurants, status=status.HTTP_200_OK)
        return Response({'error': 'Search failed'}, status=status.HTTP_400_BAD_REQUEST)