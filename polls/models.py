from django.db import models

# Create your models here.


class Polls(models.Model):
    name = models.CharField(max_length=200)
    version = models.IntegerField(default=0)
    description = models.TextField(default='')
    owner = models.ForeignKey('auth.User', related_name='snippets', on_delete=models.CASCADE, default=1)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('created_at',)
        unique_together = ('name',)
        index_together = ('name',)
