from rest_framework import serializers

from .models import Article

class ArticleSerializer(serializers.ModelSerializer):
    author_username = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Article
        fields = '__all__'


class UpdatePhaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article 
        fields = ('phase',)