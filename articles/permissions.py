from rest_framework import permissions

class IsAuthor(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if not request.user.is_authenticated:
            return False

        if request.method in permissions.SAFE_METHODS:
            return True

        if not obj.phase in ['DR','RE']:
            return False

        if request.data.get('phase') in [obj.phase, 'SU']:
            return True
    
        return False


class IsEditor(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if not request.user.is_superuser:
            return False

        if request.method in permissions.SAFE_METHODS:
            return True

        if request.data.get('title') != obj.title:
            return False

        if request.data.get('body') != obj.body:
            return False

        if request.data.get('image') != obj.image:
            return False

        if request.data.get('category') != obj.category:
            return False

        if request.data.get('phase') == 'SU' and obj.phase in ['RE','PU']:
            return True

        if request.data.get('phase') == 'PU' and obj.phase == 'AR':
            return True

        return False
