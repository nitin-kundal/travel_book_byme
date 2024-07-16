from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model.

    This serializer converts User model instances to JSON format, validates
    the data before saving, and handles user creation with unique email.
    """
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'first_name', 'last_name')
        extra_kwargs = {
            'password': {'write_only': True},
            'username': {'read_only': True}
        }

    def create(self, validated_data):
        """
        Create a new User instance using the validated data.

        This method sets the username to be the same as the email and creates
        a new user with the provided data.

        Parameters:
        - validated_data (dict): The validated data containing user details.

        Returns:
        - User: The created User instance.
        """

        # Set the username to be the same as the email
        validated_data['username'] = validated_data['email']
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        return user
