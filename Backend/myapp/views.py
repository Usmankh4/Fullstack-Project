from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Product
from .serializers import ProductSerializer
from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to the API homepage!")

class ProductViewSet(viewsets.ModelViewSet):
     queryset = Product.objects.all()
     serializer_class = ProductSerializer
     filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
     filterset_fields = ['brand']
     ordering_fields = ['name', 'price']


    
