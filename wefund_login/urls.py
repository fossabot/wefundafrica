from django.urls import path, include
from . import views
from .views import MyTokenObtainPairView, register_user, update_user_details, FileUploadView, RetrieveImageView
from .views import change_password, image_upload
from django.contrib.auth import views as auth_views


from rest_framework_simplejwt.views import (
    # TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('', views.getRoutes),

    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),


    path('register/', register_user, name='register_user'),
    path('update-profile/', update_user_details, name='update_profile'),

    path('image-upload/',image_upload, name='image_upload'),

    path('api/upload/', FileUploadView, name='file-upload'),

    path('api/read-files/', views.ListUploadedFilesView, name='list-uploaded-files'),


    path('retrieve_image/<str:username>/', RetrieveImageView.as_view(), name='retrieve_image'),

    path('change_password/', change_password, name='change_password'),

    path('password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),

    # path('password_reset/', auth_views.PasswordResetView.as_view(), name='password_reset'),
    # path('password_reset_done/', auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'),
    # path('password_reset_confirm/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    # path('password_reset_complete', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),


]
