from django.shortcuts import render
from .models import Polls
from .serializers import PollsSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
# Create your views here.


class PollList(generics.ListCreateAPIView):
    queryset = Polls.objects.all()
    serializer_class = PollsSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class PollDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Polls.objects.all()
    serializer_class = PollsSerializer

