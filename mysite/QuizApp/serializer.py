from rest_framework import serializers
from .models import UserDetails

class QuizAppSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDetails
        fields = ["id", "username", "password"]
