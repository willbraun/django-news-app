from distutils.command.upload import upload
# from sre_parse import CATEGORIES
from django.db import models
from django.conf import settings


class Article(models.Model):
    CATEGORIES = [
        ('RC', 'Recipes'),
        ('RS', 'Restaurants'),
        ('FS', 'Food Science'),
        ('DB', 'Debate'),
        ('ST', 'Stories'),
    ]
    
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
    image = models.ImageField(upload_to='articles/images/')
    category = models.CharField(max_length=2, choices=CATEGORIES, default='RC')
    phase = models.CharField(max_length=2, choices=PHASES)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title