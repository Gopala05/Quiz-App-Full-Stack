from django.urls import path
from .views import *

urlpatterns = [
    path('create/', CreateQuiz.as_view(), name = 'takeInput'),
]