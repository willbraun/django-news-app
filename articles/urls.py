from django.urls import path
from .views import ArticleListApiViewPublished, ArticleListApiViewMine, ArticleListApiViewReview, ArticleDetailApiView, ArticleDetailApiViewEditor

app_name = 'articles'

urlpatterns = [
    path('articles/<int:pk>/editor/', ArticleDetailApiViewEditor.as_view(), name='article_detail'),
    path('articles/<int:pk>/', ArticleDetailApiView.as_view(), name='article_detail'),
    path('articles/review/', ArticleListApiViewReview.as_view(), name='article_list_review'),
    path('articles/mine/', ArticleListApiViewMine.as_view(), name='article_list_mine'),
    path('articles/', ArticleListApiViewPublished.as_view(), name='article_list'),
]