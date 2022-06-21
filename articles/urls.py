from django.urls import path
from .views import ArticleListApiViewPublished, ArticleListApiViewMine, ArticleListApiViewReview

app_name = 'articles'

urlpatterns = [
    # path('blogs/<int:pk>/', PostDetailAPIView.as_view(), name='blog_detail'),
    path('articles/review/', ArticleListApiViewReview.as_view(), name='article_list_review'),
    path('articles/mine/', ArticleListApiViewMine.as_view(), name='article_list_mine'),
    path('articles/', ArticleListApiViewPublished.as_view(), name='article_list'),
    
]