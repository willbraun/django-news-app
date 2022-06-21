from django.db import models
from django.conf import settings


class Article(models.Model):
    PHASES = [
        ('DR', 'Draft'),
        ('SU', 'Submitted'),
        ('RE', 'Rejected'),
        ('PU', 'Published'),
        ('AR', 'Archived'),
    ]
    
    title = models.CharField(max_length=255)
    body = models.TextField()
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    phase = models.CharField(max_length=2, choices=PHASES, default='DR')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title