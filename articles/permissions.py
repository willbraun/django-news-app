from rest_framework import permissions

class IsAuthor(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        
        if not request.user.is_authenticated:
            return False

        if not obj.phase in ['DR','RE']:
            return False

        if not (request.data.get('phase') == obj.phase or request.data.get('phase') == 'SU'):
            return False
    
        return True


class IsEditor(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user.is_superuser
