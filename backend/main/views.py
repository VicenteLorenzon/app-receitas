from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .serializers import *
from rest_framework.authtoken.views import ObtainAuthToken
from django.core.files.base import ContentFile
import base64
import hashlib
import os


@api_view(['POST'])
def registrar_usuario(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_usuario(request, user_id):
    if request.user.id != user_id:
        return Response({'error': 'Não autorizado'}, status=status.HTTP_401_UNAUTHORIZED)
    
    try:
        user = User.objects.get(pk=user_id)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = UserSerializer(user)
    return Response(serializer.data)


@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    user = authenticate(username=username, password=password)
    if user:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})
    else:
        return Response({'error': 'Credenciais inválidas'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def logout(request):
    if request.user.is_authenticated:
        # Delete the authentication token for authenticated users
        Token.objects.filter(user=request.user).delete()
    
    return Response({'message': 'Logout bem-sucedido'})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def criar_receita(request):
    data = request.data.copy()
    data['id_usuario'] = request.user.id
    image_data = data.pop('imagem', None)

    if image_data:
        image_data = base64.b64decode(image_data)

        image_hash = hashlib.sha1(image_data).hexdigest()[:10]
        image_filename = f"{image_hash}.png"

        image_path = os.path.join('media/imagens_receitas/', image_filename)
        with open(image_path, 'wb') as f:
            f.write(image_data)

        data['imagem'] = image_filename

    serializer = ReceitaSerializer(data=data)
    if serializer.is_valid():
        instance = serializer.save(id_usuario=request.user)

        instance.imagem = image_path
        instance.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def listar_receitas(request):
    user_id = request.query_params.get('user_id')
    pesquisa = request.query_params.get('pesquisa')

    recipes = Receita.objects.all()
    if user_id:
        recipes = recipes.filter(id_usuario=user_id)
    if pesquisa:
        recipes = recipes.filter(titulo__icontains=pesquisa)

    serializer = ReceitaSerializer(recipes, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_receita(request, receita_id):
    try:
        receita = Receita.objects.get(pk=receita_id)
    except Receita.DoesNotExist:
        return Response({'message': 'Receita não encontrada.'}, status=status.HTTP_404_NOT_FOUND)

    serializer = ReceitaSerializer(receita)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def criar_avaliacao(request):
    data = request.data.copy()
    data['id_usuario'] = request.user.id

    serializer = AvaliacaoSerializer(data=data)
    if serializer.is_valid():
        serializer.save(id_usuario=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def salvar_receita(request):
    data = request.data.copy()
    data['id_usuario'] = request.user.id

    serializer = ReceitaSalvaSerializer(data=data)
    if serializer.is_valid():
        serializer.save(id_usuario=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_receitas_salvas(request):
    saved_recipes = ReceitaSalva.objects.filter(id_usuario=request.user)
    recipes = [saved_recipe.id_receita for saved_recipe in saved_recipes]
    serializer = ReceitaSerializer(recipes, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_avaliacoes_receita(request, receita_id):
    avaliacoes=Avaliacao.objects.filter(id_receita=receita_id)
    serializer = AvaliacaoSerializer(avaliacoes, many=True)
    return Response(serializer.data)