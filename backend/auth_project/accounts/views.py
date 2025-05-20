# from django.shortcuts import render

# # Create your views here.
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from auth_project.mongo import collection
# from django.contrib.auth.hashers import make_password
# import jwt, datetime
# from django.contrib.auth.hashers import check_password
# from rest_framework import status, permissions
# from rest_framework_simplejwt.tokens import RefreshToken, TokenError

# SECRET_KEY = 'django-insecure--nv57)be820ag!5ciun2k4e8scq_m#^f1d#i(f3n&bkhr_xg%t'

# class RegisterView(APIView):
#     def post(self, request):
#         data = request.data
#         if collection.find_one({'email': data['email']}):
#             return Response({'error': 'User already exists'}, status=400)
#         user = {
#             'name': data.get('name'),
#             'email': data.get('email'),
#             'password': make_password(data.get('password')),
#             # 'email': data['email'],
#             # 'password': make_password(data['password']),
#         }
#         collection.insert_one(user)
#         return Response({'message': 'User registered successfully'})


# # class LoginView(APIView):
# #     def post(self, request):
# #         data = request.data
# #         user = collection.find_one({'email': data.get('email')})
# #         if not user or not check_password(data.get('password'), user['password']):
# #             return Response({'error': 'Invalid credentials'}, status=400)

# #         payload = {
# #             'id': str(user['_id']),
# #             'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1),
# #             'iat': datetime.datetime.utcnow()
# #         }
# #         token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
# #         return Response({'token': token})
# from rest_framework_simplejwt.tokens import RefreshToken
# from rest_framework.permissions import AllowAny
# class LoginView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         data = request.data
#         user = collection.find_one({'email': data.get('email')})
#         if not user or not check_password(data.get('password'), user['password']):
#             return Response({'error': 'Invalid credentials'}, status=400)

#         refresh = RefreshToken.for_user(user)  # user must be a Django User instance, or you may need a workaround if using MongoDB

#         return Response({
#             'refresh': str(refresh),
#             'access': str(refresh.access_token),
#         })



# from rest_framework.permissions import IsAuthenticated
# from rest_framework.permissions import IsAuthenticated
# from rest_framework_simplejwt.tokens import RefreshToken, TokenError
# from rest_framework import status
# from rest_framework.response import Response
# from rest_framework.views import APIView

# class LogoutView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         refresh_token = request.data.get("refresh")
#         if refresh_token is None:
#             return Response({"error": "Refresh token not provided."}, status=status.HTTP_400_BAD_REQUEST)

#         try:
#             token = RefreshToken(refresh_token)
#             token.blacklist()
#             return Response({"detail": "Logged out successfully."}, status=status.HTTP_205_RESET_CONTENT)
#         except TokenError:
#             return Response({"error": "Invalid or expired token."}, status=status.HTTP_400_BAD_REQUEST)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.exceptions import TokenError

# Sign up

class RegisterView(APIView):
    def post(self, request):
        data = request.data
        username = data.get('name')  
        email = data.get('email')
        password = data.get('password')

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=400)
        if User.objects.filter(email=email).exists():
            return Response({'error': 'Email already exists'}, status=400)

        user = User.objects.create(
            username=username,
            email=email,
            password=make_password(password)
        )

        refresh = RefreshToken.for_user(user)
        return Response({
            'message': 'User registered successfully',
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }, status=201)

# Login (returns access & refresh token)
class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        
        user = authenticate(username=user.username, password=password)

        if user is None:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)
        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        }, status=200)


# Logout (blacklists refresh token)
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh_token = request.data.get("refresh", None)
        if not refresh_token:
            return Response({"error": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Logged out successfully"}, status=status.HTTP_205_RESET_CONTENT)
        except TokenError:
            return Response({"error": "Invalid or expired token"}, status=status.HTTP_400_BAD_REQUEST)
