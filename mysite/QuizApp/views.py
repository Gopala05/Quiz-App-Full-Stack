from django.shortcuts import render
from rest_framework import generics
from .serializer import QuizAppSerializer
from .models import UserDetails

class QuizAppUserCreate(generics.ListCreateAPIView):
    queryset = UserDetails.objects.all()
    serializer_class = QuizAppSerializer
