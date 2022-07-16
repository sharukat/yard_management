from rest_framework import status
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework import generics, permissions
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .serializers import UserSerializer, UserRegistrationSerializer, ChangePasswordSerializer

from knox.models import AuthToken
from django.contrib.auth import login
from knox.views import LoginView as KnoxLoginView
from knox.auth import TokenAuthentication
from rest_framework.authtoken.serializers import AuthTokenSerializer

# =============================================================================================

# The API endpoint for new user registration.
# Accessible by: Admins Only
# HTTP Method: POST
class UserRegistrationAPI(generics.GenericAPIView):
	
    serializer_class        = UserRegistrationSerializer
    authentication_classes  = (TokenAuthentication,)
    permission_classes      = [IsAuthenticated, IsAdminUser]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
        "user": UserSerializer(user, context=self.get_serializer_context()).data,
        "token": AuthToken.objects.create(user)[1]
        })


# The API endpoint for user login.
# Accessible by: Anyone
# HTTP Method: POST
class UserLoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(UserLoginAPI, self).post(request, format=None)


# The API endpoint for chaning password based on the email address.
# Accessible by: Admin Only
# HTTP Method: PUT
class ChangePasswordAPI(generics.UpdateAPIView):

    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = [IsAuthenticated, IsAdminUser]


    def update(self, request, *args, **kwargs):

        min_pwd_length          = 8
        min_special_char_length = 1
        min_digit_count         = 1
        digit_count             = 0
        special_characters      = "[~\!@#\$%\^&\*\(\)_\+{}\":;'\[\]]" 

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():

            queryset = User.objects.filter(email = serializer.data.get('email'))
            if queryset.exists():
                user = queryset.first()
            else:
                return Response({'error':'User does not exists.'})

            password = serializer.data.get('new_password')

            for char in password:
                if char.isdigit():
                    digit_count += 1

            if len(password) < min_pwd_length:
                response = {'status': "Password should have {} or more characters".format(min_pwd_length)}
                return Response(response)

            if not any(char in special_characters for char in password):
                response = {'status': "Password must contain at least {} special character.".format(min_special_char_length)}
                return Response(response)

            if not any(char.isupper() for char in password):
                response = {'status': "Password must contain at least 1 uppercase character."}
                return Response(response)

            if digit_count < min_digit_count:
                response = {'status': "Password must contain at least {} digits.".format(min_digit_count)}
                return Response(response)

            # set_password also hashes the password
            user.set_password(password)
            user.save()
            response = {
                'status':'success',
                'code': status.HTTP_200_OK,
                'message':'Password updated successfully',
            }

            return Response(response)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
