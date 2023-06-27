from rest_framework import serializers
from .models import Receita, Avaliacao, ReceitaSalva
from django.contrib.auth.models import User
import base64

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

class AvaliacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Avaliacao
        fields = '__all__'

class ReceitaSerializer(serializers.ModelSerializer):
    imagem = serializers.SerializerMethodField()

    class Meta:
        model = Receita
        fields = '__all__'

    def get_imagem(self, instance):
        if instance.imagem:
            with instance.imagem.open("rb") as image_file:
                encoded_string = base64.b64encode(image_file.read()).decode("utf-8")
                return encoded_string
        return None

class ReceitaSalvaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReceitaSalva
        fields = '__all__'
