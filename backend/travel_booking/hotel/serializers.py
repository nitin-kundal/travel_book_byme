from abc import ABC

from rest_framework import serializers

from .models import Hotel, Booking


class HotelSerializer(serializers.ModelSerializer):
    """
    Serializer for the Hotel model.

    This serializer converts the Hotel model instances to JSON format and
    validates the data before saving.
    """

    class Meta:
        model = Hotel
        fields = '__all__'


class BookingSerializer(serializers.ModelSerializer):
    """
    Serializer for the Booking model.

    This serializer includes the related Hotel model data and converts the
    Booking model instances to JSON format and validates the data before saving.
    """
    hotel = HotelSerializer(read_only=True)

    class Meta:
        model = Booking
        fields = '__all__'


class BookingRequestSerializer(serializers.Serializer):
    """
    Serializer for handling booking requests.

    This serializer validates the booking request data, ensuring that
    the required fields are provided and valid.
    """
    hotel_id = serializers.PrimaryKeyRelatedField(queryset=Hotel.objects.all())
    check_in_date = serializers.DateField()
    check_out_date = serializers.DateField()
