from django.shortcuts import render
from requests import request
from rest_framework import generics
from .models import Article
from .serializers import ArticleSerializer
from django.db.models import Q

# import permissions
from rest_framework.permissions import IsAuthenticatedOrReadOnly

class ArticleListApiViewPublished(generics.ListCreateAPIView):
    queryset = Article.objects.filter(phase='PU').order_by('-created_at')
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class ArticleListApiViewMine(generics.ListAPIView):
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        return Article.objects.filter(author=self.request.user).order_by('-created_at')


class ArticleListApiViewReview(generics.ListAPIView):
    queryset = Article.objects.filter(Q(phase='SU') | Q(phase='PU') | Q(phase='AR')).order_by('-created_at')
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
