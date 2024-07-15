from rest_framework import serializers

from .models import Hotel, Booking


class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = '__all__'


class BookingSerializer(serializers.ModelSerializer):
    hotel = HotelSerializer(read_only=True)

    class Meta:
        model = Booking
        fields = '__all__'


class BookingRequestSerializer(serializers.Serializer):
    hotel_id = serializers.PrimaryKeyRelatedField(queryset=Hotel.objects.all())
    check_in_date = serializers.DateField()
    check_out_date = serializers.DateField()
