from datetime import date

from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.db import models


class Hotel(models.Model):
    """
    Represents a hotel with details such as name, location, description, price per night, and total rooms.
    """
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    description = models.CharField(max_length=1024)
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2)
    total_rooms = models.IntegerField()

    def __str__(self):
        """
        String representation of the Hotel model.
        """
        return f"{self.name}"


class Booking(models.Model):
    """
    Represents a booking made by a user for a specific hotel, including check-in and check-out dates and total cost.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    check_in_date = models.DateField()
    check_out_date = models.DateField()
    total_cost = models.DecimalField(max_digits=10, decimal_places=2)

    def clean(self):
        """
        Custom validation for the Booking model.

        Ensures that the check-in date is not in the past and the check-out date is after the check-in date.
        """
        if self.check_in_date < date.today():
            raise ValidationError('Check-in date cannot be in the past.')
        if self.check_out_date <= self.check_in_date:
            raise ValidationError('Check-out date must be after check-in date.')

    def save(self, *args, **kwargs):
        """
        Custom save method for the Booking model.

        Calculates the total cost based on the number of nights and the hotel's price per night.
        """
        self.total_cost = (self.check_out_date - self.check_in_date).days * self.hotel.price_per_night
        super().save(*args, **kwargs)

    def __str__(self):
        """
        String representation of the Booking model.
        """
        return f"{self.user.username} - {self.hotel.name}"
