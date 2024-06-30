from django.urls import path
from .views import *

urlpatterns = [
    path('signup', SignUp.as_view(), name = 'signup'),
    path('signin', SignIn.as_view(), name = 'signin'),
    path('create', CreateQuiz.as_view(), name = 'create_quiz'),
    path('quiz', GetQuiz.as_view(), name = 'get_quiz'),
    path('score', Score.as_view(), name = 'score'),
    path('results', GetResults.as_view(), name = 'results'),
]