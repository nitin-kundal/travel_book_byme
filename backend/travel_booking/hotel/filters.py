import django_filters

from hotel.models import Hotel


class HotelFilter(django_filters.FilterSet):
    class Meta:
        model = Hotel
        fields = {
            'location': ['exact', 'icontains']
        }
