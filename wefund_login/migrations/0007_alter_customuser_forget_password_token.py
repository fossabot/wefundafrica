# Generated by Django 4.2 on 2023-12-19 18:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wefund_login', '0006_customuser_forget_password_token'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='forget_password_token',
            field=models.UUIDField(editable=False),
        ),
    ]
