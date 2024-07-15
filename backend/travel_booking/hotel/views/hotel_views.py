from rest_framework import filters
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from hotel.filters import HotelFilter
from hotel.models import Hotel, Booking
from hotel.serializers import HotelSerializer


class HotelViewSet(viewsets.ModelViewSet):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    filterset_class = HotelFilter
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    filterset_fields = ['location']
    search_fields = ['location']

    @action(detail=False, methods=['get'], permission_classes=[AllowAny])
    def search(self, request):
        location = request.query_params.get('location', None)
        check_in_date = request.query_params.get('check_in_date', None)
        check_out_date = request.query_params.get('check_out_date', None)

        if location and check_in_date and check_out_date:
            hotels = Hotel.objects.filter(location=location)
            available_hotels = []
            for hotel in hotels:
                overlapping_bookings = Booking.objects.filter(
                    hotel=hotel,
                    check_in_date__lt=check_out_date,
                    check_out_date__gt=check_in_date
                ).count()
                if overlapping_bookings < hotel.total_rooms:
                    available_hotels.append(hotel)
            serializer = HotelSerializer(available_hotels, many=True)
            return Response(serializer.data)
        else:
            return Response({'message': 'Please provide location, check_in_date, and check_out_date'},
                            status=status.HTTP_400_BAD_REQUEST)
