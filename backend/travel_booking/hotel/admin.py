from django.contrib import admin
from hotel.models import Hotel


class HotelAdmin(admin.ModelAdmin):
    """
    Customizes the admin interface for the Hotel model.
    """
    list_display = ('name', 'location', 'total_rooms', 'price_per_night')
    search_fields = ('name', 'location')
    list_filter = ('location',)


# Register the Hotel model with the HotelAdmin class
admin.site.register(Hotel, HotelAdmin)
