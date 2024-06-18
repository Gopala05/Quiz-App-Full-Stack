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
        data = request.data.dict()
        print(data)
        print(data['email'])
        user = data['email']
        pawd= data['password']
        
        if user:
            userPresent = UserDetails.objects.get(username = user)
            if userPresent:
                return Response({'message': "User already exists"}, status= status.HTTP_208_ALREADY_REPORTED)
            if not pawd:
                return Response({'message': "Password field cannot be empty"}, status = status.HTTP_204_NO_CONTENT) 

            serialized = UserSerializer(data=data)

            if serialized.is_valid():
                serialized.save()

                return Response({"message": "User Registered Successfully"}, status=status.HTTP_201_CREATED)
            
        
        