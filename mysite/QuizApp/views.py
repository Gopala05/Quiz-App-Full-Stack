from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from rest_framework.views import APIView
from .serializer import *
from .models import *
from rest_framework.response import Response
from rest_framework import status
import time

class Sign_Up(APIView):

    def post(self, request):

        data = request.data
        user = data.get('username')
        pawd = data.get('password')
        
        if not user:
            return Response({'message': "Username is required !"}, status=status.HTTP_400_BAD_REQUEST)
        
        if not pawd:
            return Response({'message': "Password is required !"}, status=status.HTTP_400_BAD_REQUEST)
        
        if not data.get('name'):
            return Response({'message': "Name is required !"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            UserDetails.objects.get(username=user)
            return Response({'message': "User already exists"}, status=status.HTTP_208_ALREADY_REPORTED)
        except UserDetails.DoesNotExist:
            serialized = UserSerializer(data=data)
            
            if serialized.is_valid():
                serialized.save()
                return Response({"message": "User Registered Successfully"}, status=status.HTTP_201_CREATED)
            else:
                return Response(serialized.errors, status=status.HTTP_400_BAD_REQUEST)
            

class SignIn(APIView):

    def post(self, request):

        data = request.data
        user = data.get('username')
        pawd = data.get('password')
        
        if not username:
            return Response({'message': "Username is required!"}, status=status.HTTP_400_BAD_REQUEST)
        
        if not password:
            return Response({'message': "Password is required!"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = UserDetails.objects.get(username=user, password=pawd)
            if user:
                return Response({'message': "Sign in successful!"}, status=status.HTTP_200_OK)
            else:
                return Response({'message': "Invalid credentials!"}, status=status.HTTP_401_UNAUTHORIZED)
        
        except UserDetails.DoesNotExist:
            return Response({'message': "Invalid credentials!"}, status=status.HTTP_401_UNAUTHORIZED)

            
def start_timer(request, quiz_id):

    quiz = get_object_or_404(MakeQuiz, pk=quiz_id)
    
    timer_seconds = quiz.timer_seconds

    for x in range(timer_seconds, 0, -1):
        seconds = x % 60
        minutes = int(x / 60) % 60
        hours = int(x / 3600)
        print(f'{hours:02}:{minutes:02}:{seconds:02}')
        time.sleep(1)

    print("TIME'S UP!!!!!")

    return JsonResponse({'message': "Timer completed"})