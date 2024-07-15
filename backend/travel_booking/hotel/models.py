from datetime import date

from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.db import models


class Hotel(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    description = models.CharField(max_length=1024)
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2)
    total_rooms = models.IntegerField()


class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    check_in_date = models.DateField()
    check_out_date = models.DateField()
    total_cost = models.DecimalField(max_digits=10, decimal_places=2)

    def clean(self):
        if self.check_in_date < date.today():
            raise ValidationError('Check-in date cannot be in the past.')
        if self.check_out_date <= self.check_in_date:
            raise ValidationError('Check-out date must be after check-in date.')

    def save(self, *args, **kwargs):
        self.total_cost = (self.check_out_date - self.check_in_date).days * self.hotel.price_per_night
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.username} - {self.hotel.name}"
