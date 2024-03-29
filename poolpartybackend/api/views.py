from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import UserSerializer

class SignupView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')

        if not username or not password or not email:
            return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username is already in use'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, password=password, email=email)
        login(request, user)

        return Response({'detail': 'Signup Successful'}, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({
                "detail": "Login Successful",
                "data": UserSerializer(user).data
            }, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({"detail": "Logout Successful"}, status=status.HTTP_200_OK)


class TestView(APIView):
    def get(self, request):
        return Response({"detail": "Test Successful"}, status=status.HTTP_200_OK)


class GetCSRFTokenView(APIView):
    def get(self, request):
        response = Response({'detail': 'CSRF cookie set'})
        response['X-CSRFToken'] = get_token(request)
        return response

class SessionView(APIView):
    @method_decorator(ensure_csrf_cookie)
    def get(self, request):
        if not request.user.is_authenticated:
            return Response(
                {
                'isAuthenticated': False,
                'username': '',
                }
            )
        return Response(
            {
            'isAuthenticated': True,
            'username': request.user.username
            }
        )
