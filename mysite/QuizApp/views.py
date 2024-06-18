from django.shortcuts import render
from rest_framework.views import APIView
from .serializer import *
from .models import *
from rest_framework.response import Response
from rest_framework import status


class login(APIView):
    
    def get(request):
        
        pass



    def post(self, request):
        data = request.data
        print(data)
        print(data['username'])
        
        username = data.get('username')
        password = data.get('password')
        
        if not username:
            return Response({'message': "Username is required !"}, status=status.HTTP_400_BAD_REQUEST)
        
        if not password:
            return Response({'message': "Password is required !"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            UserDetails.objects.get(username=username)
            return Response({'message': "User already exists"}, status=status.HTTP_208_ALREADY_REPORTED)
        except UserDetails.DoesNotExist:
            serialized = UserSerializer(data=data)
            
            if serialized.is_valid():
                serialized.save()
                return Response({"message": "User Registered Successfully"}, status=status.HTTP_201_CREATED)
            else:
                return Response(serialized.errors, status=status.HTTP_400_BAD_REQUEST)
                
        
        