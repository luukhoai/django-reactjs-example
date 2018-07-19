from rest_framework import serializers
from .models import Polls


class PollsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Polls
        fields = ('id', 'name', 'version', 'owner','created_at')