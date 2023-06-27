from django.db import models
from django.contrib.auth.models import User


class Receita(models.Model):
    titulo = models.CharField(max_length=255)
    ingredientes = models.TextField()
    data_criacao = models.DateTimeField(auto_now_add=True)
    id_usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    imagem = models.ImageField(upload_to='imagens_receitas/')
    descricao = models.TextField()

    def __str__(self):
        return self.titulo


class Avaliacao(models.Model):
    comentario = models.TextField()
    id_usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    id_receita = models.ForeignKey(Receita, on_delete=models.CASCADE)
    avaliacao = models.PositiveIntegerField(choices=[(i, str(i)) for i in range(1, 6)])
    data_postagem = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Avaliação de {self.avaliacao} estrelas para {self.id_receita.titulo}"


class ReceitaSalva(models.Model):
    id_usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    id_receita = models.ForeignKey(Receita, on_delete=models.CASCADE)
    data_salva = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Receita '{self.id_receita.titulo}' salva por {self.id_usuario.username}"
