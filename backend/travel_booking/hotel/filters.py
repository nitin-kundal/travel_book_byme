import django_filters

from hotel.models import Hotel


class HotelFilter(django_filters.FilterSet):
    """
    FilterSet class for filtering Hotel instances based on location.
    """

    class Meta:
        model = Hotel
        fields = {
            'location': ['exact', 'icontains']
        }
