from .models import CustomUser
from rest_framework import serializers
import re

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    def validate_password(self, value):
        # Check if the password contains at least one capital letter
        if not any(char.isupper() for char in value):
            raise serializers.ValidationError("Password must contain at least one capital letter.")

        # Check if the password contains at least one special character
        special_characters = re.compile(r'[^A-Za-z0-9]')
        if not special_characters.search(value):
            raise serializers.ValidationError("Password must contain at least one special character.")

        # Check if the password contains at least one digit
        if not any(char.isdigit() for char in value):
            raise serializers.ValidationError("Password must contain at least one digit.")

        # Check if the password has at least 8 characters
        if len(value) < 8:
            raise serializers.ValidationError("Password must have at least 8 characters.")

        # Check if the password includes a mix of alphabetic characters, numbers, and special characters
        if not (any(char.isalpha() for char in value) and
                any(char.isdigit() for char in value) and
                any(char in special_characters.pattern for char in value)):
            raise serializers.ValidationError("Password must include a mix of alphabetic characters, numbers, and special characters.")

        return value

    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'password', 'confirm_password', 'first_name', 'last_name', 
                    'phone_number', 'image', 'years_in_business', 'monthly_revenue', 
                    'po_value', 'supplier_quote', 'status'
                    )

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'

class UploadImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('image',)

class ImageSerializer(serializers.Serializer):
    image_url = serializers.URLField()


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

class ResetPasswordEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)

    def validate_email(self, value):
        """
        Check if the email exists in the database.
        """
        try:
            user = CustomUser.objects.get(email=value)
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError("This email doesn't exist. Please enter a correct email.")

        return value





# serializers.py
from django.conf import settings  # Import the settings module
import boto3

class AdminUserDetailSerializer(serializers.ModelSerializer):
    files = serializers.SerializerMethodField()

    def get_files(self, user):
        # Fetch and return the list of files uploaded by the user
        # Adjustments made to include the necessary configurations and imports
        session_s3 = boto3.session.Session(
            region_name='us-east-1',
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY
        )
        s3 = session_s3.client('s3')

        user_folder_prefix = f"user_folders/{user.username}/"
        try:
            response = s3.list_objects_v2(
                Bucket=settings.AWS_STORAGE_BUCKET_NAME,
                Prefix=user_folder_prefix
            )
            file_names = [obj['Key'].replace(user_folder_prefix, '') for obj in response.get('Contents', [])]
            return file_names
        except Exception as e:
            # Handle any errors that occur while listing objects in the S3 bucket
            raise serializers.ValidationError(f"Error listing objects in S3: {str(e)}")

    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'phone_number', 'image', 'first_name', 'last_name',
                    'is_active', 'is_staff', 'date_joined', 'years_in_business', 'po_value',
                    'supplier_quote', 'monthly_revenue', 'files', 'status')
