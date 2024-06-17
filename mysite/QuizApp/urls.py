from django.urls import path
from . import views 

urlpatterns = [
    path('Quizapp/', views.QuizAppUserCreate.as_view(), name = 'quizapp-view-create')
]