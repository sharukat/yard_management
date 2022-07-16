from rest_framework import serializers
from rest_framework import generics, permissions

from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.core.exceptions import ValidationError
# ==========================================================================

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

# Register Serializer
class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        password = data.get('password')
        min_pwd_length = 8
        min_special_char_length = 1
        min_digit_count = 2

        special_characters = "[~\!@#\$%\^&\*\(\)_\+{}\":;'\[\]]" 

        digit_count = 0

        for char in password:
            if char.isdigit():
                digit_count += 1

        if len(password) < min_pwd_length:
            response = {'status': "User registraion unsuccessful. Password should have {} or more characters".format(min_pwd_length)}
            raise ValidationError(response)

        if not any(char in special_characters for char in password):
            response = {'status': "User registraion unsuccessful. Password must contain at least {} special character.".format(min_special_char_length)}
            raise ValidationError(response) 

        if not any(char.isupper() for char in password):
            response = {'status': "User registraion unsuccessful. Password must contain at least 1 uppercase character."}
            raise ValidationError(response)

        if digit_count < min_digit_count:
            response = {'status': "User registraion unsuccessful. Password must contain at least {} digits.".format(min_digit_count)}
            raise ValidationError(response)
        return data

    def create(self, validated_data):
        user = User.objects.create_user(
        	validated_data['username'], 
        	validated_data['email'], 
        	validated_data['password'])
        return user

# User password changing serializer
class ChangePasswordSerializer(serializers.Serializer):
    model = User
    email = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(
        max_length=100,
        style={'placeholder': 'Email', 'autofocus': True})
    password = serializers.CharField(
        max_length=100,
        style={'input_type': 'password', 'placeholder': 'Password'})
