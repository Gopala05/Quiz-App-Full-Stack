from rest_framework.views import APIView
from .serializer import *
from .models import *
from rest_framework.response import Response
from rest_framework import status
import time

class SignUp(APIView):

    def post(self, request):
        data = request.data
        username = data.get('username')
        password = data.get('password')
        name = data.get('name')

        if not username:
            return Response({'message': "Username is required!"}, status=status.HTTP_400_BAD_REQUEST)
        if not password:
            return Response({'message': "Password is required!"}, status=status.HTTP_400_BAD_REQUEST)
        if not name:
            return Response({'message': "Name is required!"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            if UserDetails.objects.filter(username=username).exists():
                return Response({'message': "User already exists"}, status=status.HTTP_208_ALREADY_REPORTED)

            serialized = UserSerializer(data=data)
            if serialized.is_valid():
                serialized.save()
                return Response({"message": "User Registered Successfully"}, status=status.HTTP_201_CREATED)
            else:
                return Response(serialized.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({"message": "Internal Server Error", "error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class SignIn(APIView):

    def post(self, request):
        data = request.data
        username = data.get('username')
        password = data.get('password')

        if not username:
            return Response({'message': "Username is required!"}, status=status.HTTP_400_BAD_REQUEST)

        if not password:
            return Response({'message': "Password is required!"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = UserDetails.objects.get(username=username, password=password)
            return Response({'message': "Sign in successful!"}, status=status.HTTP_200_OK)
        except UserDetails.DoesNotExist:
            return Response({'message': "Invalid credentials!"}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response({"message": "Internal Server Error", "error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CreateQuiz(APIView):

    def post(self, request):
        try:
            data = request.data
            
            print("Title, no of questions, marks for each, no of choices, question number, question, time limit and right answer respectively")
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
            
            try:
                if MakeQuiz.objects.filter(title=title).exists():
                    return Response({"message": "Quiz with the Title Exists, try with another title"}, status=status.HTTP_208_ALREADY_REPORTED)
                
                quiz_data = {
                    'title': title,
                    'no_of_questions': no_of_questions,
                    'marks_per_question': marks_per_question,
                    'no_of_choices': no_of_choices,
                    'options': options,
                    'questions': questions,
                    'timer_seconds': timer_seconds,
                    'correct_option': correct_option
                }
                
                quiz_serializer = MakeQuizSerializer(data=quiz_data)
                
                if quiz_serializer.is_valid():
                    quiz_serializer.save()
                    return Response({"message": "Quiz created successfully", "details": quiz_serializer.data}, status=status.HTTP_201_CREATED)
                else:
                    return Response({"message": "Invalid Details", "errors": quiz_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
            
            except Exception as e:
                return Response({"message": "Invalid Details", "error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        except Exception as e:
            return Response({"message": "Internal Server Error", "error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
# class ForTimer(APIView):   

#     def start_timer(request, quiz_id):

#         quiz = get_object_or_404(MakeQuiz, pk=quiz_id)
    
#         timer_seconds = quiz.timer_seconds

#         for x in range(timer_seconds, 0, -1):
#             seconds = x % 60
#             minutes = int(x / 60) % 60
#             hours = int(x / 3600)
#             print(f'{hours:02}:{minutes:02}:{seconds:02}')
#             time.sleep(1)

#         print("TIME'S UP!!!!!")

#         return JsonResponse({'message': "Timer completed"})
    
class GetQuiz(APIView):

    def get(self, request):
        title = request.query_params.get('title')

        if not title:
            return Response({"message": "Please Provide the Title"}, status=status.HTTP_404_NOT_FOUND)
        
        quiz = MakeQuiz.objects.filter(title=title)
        
        if not quiz.exists():
            return Response({"message": "Quiz with the Title not Found!"}, status=status.HTTP_400_BAD_REQUEST)
        
        quiz_serializer = MakeQuizSerializer(quiz, many=True)
        return Response({"message": "Quiz Found", "details": quiz_serializer.data}, status=status.HTTP_200_OK)

class Score(APIView):

    def post(self, request):
        try:
            data = request.data
            
            title = data.get('title')
            marks_scored = data.get('marks_scored')
            maximum_score = data.get('maximum_score')
            user = data.get('username')
            
            if not title:
                return Response({'message': "Quiz Title is required!"}, status=status.HTTP_400_BAD_REQUEST)
            
            if not marks_scored:
                return Response({'message': "Marks Scored is required!"}, status=status.HTTP_400_BAD_REQUEST)
            
            if not user:
                return Response({'message': "Username is required!"}, status=status.HTTP_400_BAD_REQUEST)
            
            try:
                if MakeQuiz.objects.filter(title=title).exists():
                    if UserDetails.objects.filter(username=user).exists():
                        score_data = {
                            'quiz_title': title,
                            'marks_scored' : marks_scored,
                            'maximum_score' : maximum_score,
                            'username' : user
                        }
                        
                        score_serializer = UserScoreSerializer(data=score_data)
                        
                        if score_serializer.is_valid():
                            score_serializer.save()
                            return Response({"message": "Quiz created successfully", "details": score_serializer.data}, status=status.HTTP_201_CREATED)
                        else:
                            return Response({"message": "Invalid Details", "errors": score_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
                
                    else:
                        return Response({"message": "User doen't Exists"}, status=status.HTTP_404_NOT_FOUND)     
                               
                else:
                    return Response({"message": "Quiz doen't Exists"}, status=status.HTTP_404_NOT_FOUND)                
            
            except Exception as e:
                return Response({"message": "Invalid Details", "error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        except Exception as e:
            return Response({"message": "Internal Server Error", "error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class GetResults(APIView):

    def get(self, request):
        title = request.query_params.get('title')
        
        if not title:
            return Response({"message": "Please Provide the Title"}, status=status.HTTP_404_NOT_FOUND)
        
        quiz = UserScore.objects.filter(quiz_title=title)
        
        if not quiz.exists():
            return Response({"message": "Quiz with the Title not Found!"}, status=status.HTTP_400_BAD_REQUEST)
        
        quiz_serializer = UserScoreSerializer(quiz, many=True)
        return Response({"message": "Quiz Found", "details": quiz_serializer.data}, status=status.HTTP_200_OK)