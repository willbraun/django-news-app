from rest_framework import permissions

class IsAuthor(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user != obj.author:
            return False

        if request.method in permissions.SAFE_METHODS:
            return True

        if obj.phase in ['DR','RE']:
            if request.method == 'DELETE':
                return True
            if request.method == 'PUT':
                if request.user.is_superuser:
                    return request.data.get('phase') in ['DR', 'PU']
                else:
                    return request.data.get('phase') in ['DR', 'SU']
            
        return False
        

class IsEditor(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if not request.user.is_superuser:
            return False

        if request.method in permissions.SAFE_METHODS:
            return True

        if request.data.get('phase') in ['RE','PU'] and obj.phase == 'SU':
            return True

        if request.data.get('phase') == 'AR' and obj.phase == 'PU':
            return True

        return False
