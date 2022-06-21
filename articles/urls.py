from django.urls import path
from .views import ArticleListApiViewPublished, ArticleListApiViewMine, ArticleListApiViewReview, ArticleDetailApiView, ArticleDetailApiViewEditor, ArticleApiCreate

app_name = 'articles'

urlpatterns = [
    path('articles/<int:pk>/editor/', ArticleDetailApiViewEditor.as_view(), name='article_detail_editor'),
    path('articles/<int:pk>/', ArticleDetailApiView.as_view(), name='article_detail'),
    path('articles/add/', ArticleApiCreate.as_view(), name='article_add_form'),
    path('articles/review/', ArticleListApiViewReview.as_view(), name='article_list_review'),
    path('articles/mine/', ArticleListApiViewMine.as_view(), name='article_list_mine'),
    path('articles/', ArticleListApiViewPublished.as_view(), name='article_list'),
]