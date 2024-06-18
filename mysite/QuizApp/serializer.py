from rest_framework import serializers
from .models import UserDetails

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDetails
        fields = ["id", "username", "password"]
