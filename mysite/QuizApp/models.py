from django.db import models
from django.core.validators import MinValueValidator

class UserDetails(models.Model):
    username = models.CharField(primary_key=True, max_length=20)
    password = models.CharField(max_length=10, null=False, blank=False)
    name = models.CharField(max_length=10, null=False, blank=False)

    def __str__(self):
        return self.username

class MakeQuiz(models.Model):
    title = models.CharField(max_length=20, unique=True, blank=False, null=False)
    no_of_questions = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    marks_per_question = models.PositiveIntegerField(validators=[MinValueValidator(1)]) 
    no_of_choices = models.PositiveIntegerField(validators=[MinValueValidator(2)]) 
    question_number = models.PositiveIntegerField(primary_key=True, validators=[MinValueValidator(1)])
    question = models.CharField(max_length=100, unique=True, blank=False, null=False)
    timer_seconds = models.IntegerField(null=False, blank=False, default=10)
    option = models.CharField(max_length=1)

    def __str__(self):
        return self.title

class TakeQuiz(models.Model):
    quiz = models.ForeignKey(MakeQuiz, on_delete=models.CASCADE)
    question_number = models.PositiveIntegerField()
    selected_choice = models.IntegerField()
    marks_per_question = models.PositiveIntegerField(default=2)
    marks_alloted = models.BooleanField(default=False)

    class Meta:
        unique_together = ('quiz', 'question_number')

    def __str__(self):
        return f"Quiz: {self.quiz.title}, Question: {self.question_number}"

class UserScore(models.Model):
    quiz_title = models.ForeignKey(MakeQuiz, on_delete=models.CASCADE)
    marks_scored = models.IntegerField()
    username = models.ForeignKey(UserDetails, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('quiz_title', 'username')

    def __str__(self):
        return f"Quiz: {self.quiz_title.title}, User: {self.username.username}"
