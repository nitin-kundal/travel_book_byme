from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.

    This viewset provides the standard actions for CRUD operations on the User model,
    including creating a new user with JWT authentication tokens.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        """
        Create a new User instance and return JWT tokens.

        This method creates a new user and generates JWT tokens (access and refresh)
        for the newly created user.

        Parameters:
        - request: The request object containing user data.

        Returns:
        - Response: A response object containing the username and JWT tokens.
        """
        response = super().create(request, *args, **kwargs)
        user = User.objects.get(email=response.data['email'])
        refresh = RefreshToken.for_user(user)
        return Response({
            'username': user.username,
            'access': str(refresh.access_token),
            'refresh': str(refresh)
        })
