from django.urls import path
from . import views


urlpatterns = [
    path('cadastro/', views.registrar_usuario, name='registrar-usuario'),
    path('usuario/<int:user_id>/', views.get_usuario, name='get-usuario'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('receitas/criar/', views.criar_receita, name='criar-receita'),
    path('receitas/', views.listar_receitas, name='listar-receitas'),
    path('receitas/<int:receita_id>/', views.get_receita, name='get-receita'),
    path('receitas/avaliar/', views.criar_avaliacao, name='criar-avaliacao'),
    path('receitas/salvar/', views.salvar_receita, name='salvar-receita'),
    path('receitas/salvas/', views.get_receitas_salvas, name='get-receitas-salvas'),
    path('receitas/<int:receita_id>/avaliacoes/', views.get_avaliacoes_receita, name='get-avaliacoes-receita')
]
