"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from ai_agent.views import RestaurantSearchView
from restaurants.views import RestaurantCreateView
from menus.views import MenuItemCreateView, MenuItemListView
from locations.views import LocationCreateView
from services.views import ServiceCreateView
from orders.views import FoodOrderView, TableBookingView
from payments.views import PaymentView
from users.views import UserProfileView, LoginView, LogoutView, GetCSRFToken

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/restaurants/search/', RestaurantSearchView.as_view(), name='restaurant-search'),
    path('api/restaurants/', RestaurantCreateView.as_view(), name='restaurant-list'),
    path('api/restaurants/<int:pk>/', RestaurantCreateView.as_view(), name='restaurant-detail'),
    path('api/menu-items/create/', MenuItemCreateView.as_view(), name='menu-item-create'),
    path('api/menu-items/', MenuItemListView.as_view(), name='menu-item-list'),
    path('api/locations/create/', LocationCreateView.as_view(), name='location-create'),
    path('api/services/create/', ServiceCreateView.as_view(), name='service-create'),
    path('api/orders/', FoodOrderView.as_view(), name='food-order'),
    path('api/bookings/', TableBookingView.as_view(), name='table-booking'),
    path('api/payments/', PaymentView.as_view(), name='payment'),
    path('api/user-profile/', UserProfileView.as_view(), name='user-profile'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/logout/', LogoutView.as_view(), name='logout'),
    path('api/get-csrf-token/', GetCSRFToken.as_view(), name='get-csrf-token'),
]