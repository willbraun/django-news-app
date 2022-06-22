from django.shortcuts import render
from requests import request
from rest_framework import generics
from .models import Article
from .serializers import ArticleSerializer, UpdatePhaseSerializer
from django.db.models import Q
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from articles.permissions import IsAuthor, IsEditor


class ArticleListApiView(generics.ListAPIView):
    queryset = Article.objects.filter(phase='PU').order_by('-created_at')
    serializer_class = ArticleSerializer
    permission_classes = (AllowAny,)
        

class ArticleListApiViewMine(generics.ListCreateAPIView):
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Article.objects.filter(author=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(author=self.request.user, phase='DR')


class ArticleDetailApiView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthor,)


class ArticleListApiViewReview(generics.ListAPIView):
    queryset = Article.objects.filter(Q(phase='SU') | Q(phase='PU') | Q(phase='AR')).order_by('-created_at')
    serializer_class = ArticleSerializer
    permission_classes = (IsEditor,)


class ArticleDetailApiViewEditor(generics.RetrieveAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (IsEditor,)


class ArticleUpdatePhaseView(generics.UpdateAPIView):
    queryset = Article.objects.all()
    serializer_class = UpdatePhaseSerializer
    permission_classes = (IsEditor,)

