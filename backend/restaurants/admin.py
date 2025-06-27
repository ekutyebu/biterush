from django.contrib import admin
from django.contrib.gis import admin as gis_admin
from .models import Restaurant, MenuCategory, MenuItem

# Register your models here.
@admin.register(Restaurant)
class RestaurantAdmin(gis_admin.OSMGeoAdmin):
    list_display = ('name', 'owner', 'address', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('name', 'address', 'owner__email')

admin.site.register(MenuCategory)
admin.site.register(MenuItem)