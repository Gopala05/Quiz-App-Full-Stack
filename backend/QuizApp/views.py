from rest_framework.views import APIView
from .serializer import *
from .models import *
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password, check_password

class SignUp(APIView):
    
    def post(self, request):
        data = request.data
        username = data.get('username')
        password = data.get('password')
        name = data.get('name')

        if not username or not password or not name:
            return Response({'message': "Please fill all the fields"}, status=status.HTTP_400_BAD_REQUEST)

        if len(password) < 8:
            return Response({'message': "Password must be at least 8 characters long"}, status=status.HTTP_400_BAD_REQUEST)
        if not any(char.isalpha() for char in password) or not any(char.isdigit() for char in password):
            return Response({'message': "Password must contain at least one letter and one digit"}, status=status.HTTP_400_BAD_REQUEST)

        # Hash the password
        hashed_password = make_password(password)

        try:
            if UserDetails.objects.filter(username=username).exists():
                return Response({'message': "User already exists"}, status=status.HTTP_208_ALREADY_REPORTED)

            serialized = UserSerializer(data={'username': username, 'password': hashed_password, 'name': name})
            if serialized.is_valid():
                serialized.save()
                return Response({"message": "User Registered Successfully", "user": serialized.data}, status=status.HTTP_201_CREATED)
            else:
                return Response(serialized.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({"message": "Internal Server Error", "error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class SignIn(APIView):

    def post(self, request):
        data = request.data
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return Response({'message': "Username and password are required!"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = UserDetails.objects.get(username=username)
            
            if check_password(password, user.password):
                user_serializer = UserSerializer(user)
                return Response({'message': "Sign in successful!", 'user': user_serializer.data}, status=status.HTTP_200_OK)
            else:
                return Response({'message': "Invalid credentials!"}, status=status.HTTP_401_UNAUTHORIZED)

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

class CheckAttempt(APIView):
    
    def post(self, request):
        title = request.data.get('title')
        username = request.data.get('username')
        
        if not title or not username:
            return Response({"message": "Both title and username are required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user_score = UserScore.objects.get(username=username, quiz_title=title)
            return Response({"message": "User has already attempted this quiz"}, status=status.HTTP_208_ALREADY_REPORTED)
        except UserScore.DoesNotExist:
            return Response({"message": "User can attempt the quiz"}, status=status.HTTP_200_OK)

class CheckTitle(APIView):
    
    def get(self, request):
        user_title = request.query_params.get('title')
        
        if not user_title:
            return Response({"message": "Title is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            title_exists = MakeQuiz.objects.get(title=user_title)
            return Response({"message": "Quiz with this title is already Present"}, status=status.HTTP_208_ALREADY_REPORTED)
        except MakeQuiz.DoesNotExist:
            return Response({"message": "Title can be used"}, status=status.HTTP_200_OK)
        
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
            correct = data.get('correct')
            wrong = data.get('wrong')
            
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
                            'correct_answers': correct,
                            'wrong_answers': wrong,
                            'username' : user
                        }
                        
                        score_serializer = UserScoreSerializer(data=score_data)
                        
                        if score_serializer.is_valid():
                            score_serializer.save()
                            return Response({"message": "Result stored successfully", "details": score_serializer.data}, status=status.HTTP_201_CREATED)
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
        
class GetQuizResults(APIView):

    def get(self, request):
        title = request.query_params.get('title')
        
        if not title:
            return Response({"message": "Please Provide the Title"}, status=status.HTTP_404_NOT_FOUND)
        
        quiz = UserScore.objects.filter(quiz_title=title)
        
        if not quiz.exists():
            return Response({"message": "Quiz with the Title not Found!"}, status=status.HTTP_400_BAD_REQUEST)
        
        quiz_serializer = UserScoreSerializer(quiz, many=True)
        return Response({"message": "Quiz Found", "details": quiz_serializer.data}, status=status.HTTP_200_OK)
    
class GetUserResults(APIView):

    def get(self, request):
        username = request.query_params.get('username')
        
        if not username:
            return Response({"message": "Username is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user_scores = UserScore.objects.filter(username=username)
            if not user_scores.exists():
                return Response({"message": "No records found for this username"}, status=status.HTTP_404_NOT_FOUND)
            
            score_serializer = UserScoreSerializer(user_scores, many=True)
            return Response({"message": "Scores found", "details": score_serializer.data}, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({"message": "An error occurred while fetching user scores", "error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class LeaderboardAPI(APIView):
    def get(self, request):
        all_users_scores = UserScore.objects.order_by('-marks_scored')
        all_users_serializer = UserScoreSerializer(all_users_scores, many=True)

        quiz_title_param = request.query_params.get('quiz_title')
        username_param = request.query_params.get('username')

        if quiz_title_param:
            try:
                all_users_scores = UserScore.objects.filter(quiz_title=quiz_title_param).order_by('-marks_scored')
                all_users_serializer = UserScoreSerializer(all_users_scores, many=True)

                if username_param:
                    user_score = all_users_scores.filter(username__username=username_param).order_by('-marks_scored').first()
                    if not user_score:
                        return Response({"message": f"No standings found for quiz {quiz_title_param}"}, status=status.HTTP_404_NOT_FOUND)

                    user_serializer = UserScoreSerializer(user_score)
                    return Response({ "details": all_users_serializer.data, "user_standings": user_serializer.data }, status=status.HTTP_200_OK)
                return Response({ "details": all_users_serializer.data }, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({"message": "An error occurred", "error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({"all_users": all_users_serializer.data}, status=status.HTTP_200_OK)