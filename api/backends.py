from django.contrib.auth.backends import ModelBackend
from .models import User

class CustomUserBackend(ModelBackend):
    def authenticate(self, request, Username=None, Password=None, **kwargs):
        try:
            user = User.objects.get(UserName=Username)
            if user.check_password(Password):
                return user
        except User.DoesNotExist:
            return None