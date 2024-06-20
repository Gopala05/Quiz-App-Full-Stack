from django.urls import path
from .views import *

urlpatterns = [
    path('register/', Register.as_view(), name = 'register'),
    path('start-timer/<int:quiz_id>/', start_timer, name='start-timer'),
]