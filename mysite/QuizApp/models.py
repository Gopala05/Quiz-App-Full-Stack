from django.db import models

class UserDetails(models.Model):
    username = models.Charfield(max_length=10)
    password = models.Charfield(max_length=10)


    def __string__(self):
        return self.username
