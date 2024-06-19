from django.shortcuts import render
from rest_framework.views import APIView
from .serializer import *
from .models import *
from rest_framework.response import Response
from rest_framework import status
import time

class Sign_Up(APIView):

    def post(self, request):

        user = data.get('username')
        pawd = data.get('password')
        data = data.get()
        
        if not user:
            return Response({'message': "Username is required !"}, status=status.HTTP_400_BAD_REQUEST)
        
        if not pawd:
            return Response({'message': "Password is required !"}, status=status.HTTP_400_BAD_REQUEST)
        
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
            
def StartTimer(request):

    time = int(input("Enter the time in seconds: "))

    for x in range(time, 0, -1):
        seconds = x % 60
        minutes = int(x/60) % 60
        hours = int(x/3600)
        printf(f'{hours:02}:{minutes:02}:{seconds:02}')
        time.sleep(1)

    print("TIME'S UPP!!!!!")