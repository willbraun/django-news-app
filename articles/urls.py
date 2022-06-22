from django.urls import path
from .views import ArticleListApiView, ArticleListApiViewMine, ArticleListApiViewReview, ArticleDetailApiView, ArticleDetailApiViewEditor, ArticleUpdatePhaseView

app_name = 'articles'

urlpatterns = [
    path('articles/review/<int:pk>/editphase/', ArticleUpdatePhaseView.as_view(), name='article_edit_phase'),
    path('articles/review/<int:pk>/', ArticleDetailApiViewEditor.as_view(), name='article_detail_editor'),
    path('articles/review/', ArticleListApiViewReview.as_view(), name='article_list_review'),
    path('articles/mine/<int:pk>/', ArticleDetailApiView.as_view(), name='article_detail'),
    path('articles/mine/', ArticleListApiViewMine.as_view(), name='article_list_mine'),
    path('articles/', ArticleListApiView.as_view(), name='article_list'),
]