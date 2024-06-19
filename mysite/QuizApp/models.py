from django.db import models
from django.core.validators import MinValueValidator

class UserDetails(models.Model):
    username = models.CharField(primary_key=True, max_length=20)
    password = models.CharField(max_length=10, null = False, blank = False)
    name = models.CharField(max_length=10, null = False, blank = False)

    def __string__(self):
        return self.username
    

class MakeQuiz(models.Model):
    title = models.CharField(unique=True,blank=False, null=False, max_length=20)
    no_of_questions = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    marks_per_question = models.PositiveIntegerField(validators=[MinValueValidator(1)]) 
    no_of_choices = models.PositiveIntegerField(validators=[MinValueValidator(2)]) 
    question_number = models.PositiveIntegerField(primary_key=True, validators=[MinValueValidator(1)])
    question = models.CharField(max_length=100, unique=True, blank=False, null= False)


class TakeQuiz(models.Model):
    question_number = models.ForeignKey(MakeQuiz, unique=True)
    selected_choice = models.IntegerField()
    marks_per_question = models.ForeignKey(MakeQuiz)
    marks_alloted = models.BooleanField(default=False)

class UserScore(models.Model):
    quiz_title = models.ForeignKey(MakeQuiz, on_delete=models.CASCADE)
    marks_scored = models.IntegerField()
    username = models.ForeignKey(UserDetails, unique=True)
    