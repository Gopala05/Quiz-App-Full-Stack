from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDetails
        fields = '__all__'

class MakeQuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = MakeQuiz
        fields = '__all__'

# class TakeQuizSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = TakeQuiz
#         fields = '__all__'
        
class UserScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserScore
        fields = '__all__'
