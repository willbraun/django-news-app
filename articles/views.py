from django.shortcuts import render
from requests import request
from rest_framework import generics
from .models import Article
from .serializers import ArticleSerializer, UpdatePhaseSerializer
from django.db.models import Q
from rest_framework.permissions import IsAuthenticated, AllowAny
from articles.permissions import IsAuthorOrReadOnly, IsEditor


class ArticleListApiView(generics.ListAPIView):
    serializer_class = ArticleSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        try:
            this_category = self.kwargs['category'].upper()

            def tuple_first(this_tuple):
                return this_tuple[0]

            if this_category in list(map(tuple_first, Article.CATEGORIES)):
                return Article.objects.filter(category=this_category).filter(phase='PU').order_by('-created_at')
        except:
            return Article.objects.filter(phase='PU').order_by('-created_at')


class ArticleListApiViewMine(generics.ListCreateAPIView):
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Article.objects.filter(author=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class ArticleDetailApiView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthorOrReadOnly,)


class ArticleListApiViewReview(generics.ListAPIView):
    queryset = Article.objects.filter(Q(phase='SU') | Q(phase='PU')).order_by('-created_at')
    serializer_class = ArticleSerializer
    permission_classes = (IsEditor,)


class ArticleUpdatePhaseView(generics.UpdateAPIView):
    queryset = Article.objects.all()
    serializer_class = UpdatePhaseSerializer
    permission_classes = (IsEditor,)

