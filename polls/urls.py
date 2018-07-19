from django.urls import path

from .views import PollList, PollDetail

urlpatterns = [
    path('', PollList.as_view(), name='index'),
    path('<int:pk>/', PollDetail.as_view(), name='detail')
]