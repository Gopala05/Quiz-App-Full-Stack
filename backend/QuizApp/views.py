from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from rest_framework.views import APIView
from .serializer import *
from .models import *
from rest_framework.response import Response
from rest_framework import status
import time

class SignUp(APIView):

    def post(self, request):
        try:
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
        except:
            return Response({"message": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class SignIn(APIView):
    
    def post(self, request):
        try:
            data = request.data
            user = data.get('username')
            pawd = data.get('password')
            
            if not user:
                return Response({'message': "Username is required!"}, status=status.HTTP_400_BAD_REQUEST)
            
            if not pawd:
                return Response({'message': "Password is required!"}, status=status.HTTP_400_BAD_REQUEST)
            
            try:
                userExists = UserDetails.objects.get(username=user, password=pawd)
                if userExists:
                    return Response({'message': "Sign in successful!"}, status=status.HTTP_200_OK)
                else:
                    return Response({'message': "Invalid credentials!"}, status=status.HTTP_401_UNAUTHORIZED)
            
            except UserDetails.DoesNotExist:
                return Response({'message': "Invalid credentials!"}, status=status.HTTP_401_UNAUTHORIZED)
        except:
            return Response({"message": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CreateQuiz(APIView):

    def post(self,request):
        try:
            data = request.data 
            
            print("Title, no of questions, marks for each, no of choices , question number, question, time limit and right answer respectively")
            title = data.get('title')
            timer_seconds = data.get('timer_seconds')
            no_of_questions = data.get('no_of_questions')
            marks_per_question = data.get('marks_per_question')
            no_of_choices = data.get('no_of_choices')
            options = data.get('options')
            questions = data.get('questions')
            correct_option = data.get('correct_option')
            
            if not title:
                return Response({'message': "Title is required!"}, status=status.HTTP_400_BAD_REQUEST)
            
            if not no_of_questions:
                return Response({'message': "No. of Questions is required!"}, status=status.HTTP_400_BAD_REQUEST)
            
            if not no_of_choices:
                return Response({'message': "No. of Choices is required!"}, status=status.HTTP_400_BAD_REQUEST)
            
            if not questions:
                return Response({'message': "Questions are required!"}, status=status.HTTP_400_BAD_REQUEST)
            
            if not options:
                return Response({'message': "Options are required!"}, status=status.HTTP_400_BAD_REQUEST)
            
            if not correct_option:
                return Response({'message': "Correct Options are required!"}, status=status.HTTP_400_BAD_REQUEST)
            
            # Create MakeQuiz object
            quiz = MakeQuiz.objects.create(
                title=title,
                no_of_questions=no_of_questions,
                marks_per_question=marks_per_question,
                no_of_choices=no_of_choices,
                options=options,
                questions=questions,
                timer_seconds=timer_seconds,
                correct_option = correct_option
            )
            
            quiz.save()
            
            # Return success response
            return Response({"message": "Quiz created successfully"}, status=status.HTTP_201_CREATED)
        except:
            return Response({'message': "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ForTimer(APIView):   

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
    
class GetQuiz(APIView):

    def get(self, request):
        try:
            title = self.request.query_params.get('title')
        
        except:
            return Response({"message": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

