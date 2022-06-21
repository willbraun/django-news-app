from rest_framework import permissions

class IsAuthor(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return False
        if request.method in permissions.SAFE_METHODS:
            return True
        
        if not obj.author == request.user:
            return False

        if not obj.phase in ['DR','RE']:
            return False

        if not (obj.phase == request.data.get('phase') or obj.phase == 'SU'):
            return False

        return True


class IsEditor(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user.is_superuser
