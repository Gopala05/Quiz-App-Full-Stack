from django.urls import path
from .views import *

urlpatterns = [
    path('signup', SignUp.as_view(), name = 'signup'),
    path('signin', SignIn.as_view(), name = 'signin'),
    path('create', CreateQuiz.as_view(), name = 'create_quiz'),
    path('quiz', GetQuiz.as_view(), name = 'get_quiz'),
    path('check-attempt', CheckAttempt.as_view(), name = 'check_attempt'),
    path('check-title', CheckTitle.as_view(), name = 'check_title'),
    path('score', Score.as_view(), name = 'score'),
    path('leadboard', LeaderboardAPI.as_view(), name = 'leadboard'),
    path('quiz-results', GetUserResults.as_view(), name = 'quiz_results'),
]