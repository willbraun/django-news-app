from django.shortcuts import render
from requests import request
from rest_framework import generics
from .models import Article
from .serializers import ArticleSerializer
from django.db.models import Q
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from articles.permissions import IsAuthor, IsEditor


class ArticleListApiView(generics.ListCreateAPIView):
    queryset = Article.objects.filter(phase='PU').order_by('-created_at')
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user, phase='DR')
        

class ArticleListApiViewMine(generics.ListAPIView):
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Article.objects.filter(author=self.request.user).order_by('-created_at')


class ArticleListApiViewReview(generics.ListAPIView):
    queryset = Article.objects.filter(Q(phase='SU') | Q(phase='PU') | Q(phase='AR')).order_by('-created_at')
    serializer_class = ArticleSerializer
    permission_classes = (IsEditor,)

# Author can delete their own articles
class ArticleDetailApiView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthor,)

# Editor can update but not delete all articles. Editor can delete articles they authored.
class ArticleDetailApiViewEditor(generics.RetrieveUpdateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (IsEditor,)
