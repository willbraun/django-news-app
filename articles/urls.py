from django.urls import path
from .views import ArticleListApiView, ArticleListApiViewMine, ArticleListApiViewReview, ArticleDetailApiView, ArticleUpdatePhaseView

app_name = 'articles'

urlpatterns = [
    path('articles/<int:pk>/editphase/', ArticleUpdatePhaseView.as_view(), name='article_edit_phase'),
    path('articles/<int:pk>/', ArticleDetailApiView.as_view(), name='article_detail'),
    path('articles/review/', ArticleListApiViewReview.as_view(), name='article_list_review'),
    path('articles/mine/', ArticleListApiViewMine.as_view(), name='article_list_mine'),
    path('articles/', ArticleListApiView.as_view(), name='article_list'),
]