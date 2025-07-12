from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from hotel.models import Booking
from hotel.serializers import BookingSerializer, BookingRequestSerializer


class BookingViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing booking instances.
    """
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        """
        Create a new booking.

        This method checks room availability for the given hotel and dates,
        calculates the total cost, and saves the booking if rooms are available.

        Parameters:
        - request: The request object containing booking data.

        Returns:
        - Response: The created booking data with status 201 if successful.
        - Response: An error message with status 400 if the room is not available
          or if there are validation errors.
        """

        request_serializer = BookingRequestSerializer(data=request.data)
        if request_serializer.is_valid():
            hotel = request_serializer.validated_data['hotel_id']
            check_in_date = request_serializer.validated_data['check_in_date']
            check_out_date = request_serializer.validated_data['check_out_date']

            # Check room availability
            overlapping_bookings = Booking.objects.filter(
                hotel=hotel,
                check_in_date__lt=check_out_date,
                check_out_date__gt=check_in_date
            ).count()

            if overlapping_bookings < hotel.total_rooms:
                total_cost = (check_out_date - check_in_date).days * hotel.price_per_night
                booking = Booking(
                    user=request.user,
                    hotel=hotel,
                    check_in_date=check_in_date,
                    check_out_date=check_out_date,
                    total_cost=total_cost
                )
                booking.save()
                response_serializer = BookingSerializer(booking)
                return Response(response_serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response({'message': 'No rooms available for the selected dates'},
                                status=status.HTTP_400_BAD_REQUEST)
        return Response(request_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def history(self, request):
        """
        Retrieve the booking history for the authenticated user.

        Parameters:
        - request: The request object.

        Returns:
        - Response: A list of bookings and the total number of bookings.
        """

        user = request.user
        bookings = Booking.objects.filter(user=user)
        serializer = BookingSerializer(bookings, many=True)
        total_bookings = bookings.count()
        return Response({'total_bookings': total_bookings, 'bookings': serializer.data})
