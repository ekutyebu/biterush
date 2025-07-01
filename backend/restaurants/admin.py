from django.contrib import admin
from .models import Restaurant, MenuCategory, MenuItem

@admin.register(Restaurant)
class RestaurantAdmin(admin.ModelAdmin):
    list_display = ('name', 'owner', 'description', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name', 'description', 'owner__email')

admin.site.register(MenuCategory)
admin.site.register(MenuItem)