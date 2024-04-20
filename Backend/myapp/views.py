from django.shortcuts import render
from rest_framework.decorators import action
from django.http import JsonResponse
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Product
from .serializers import ProductSerializer
from django.http import HttpResponse
from rest_framework import views
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from .serializers import ProductSerializer
from rest_framework.decorators import api_view
from .models import PhoneBrand, PhoneModel, RepairService, Accessories
from .serializers import PhoneBrandSerializer
from rest_framework.response import Response
from .serializers import PhoneBrandSerializer, PhoneModelSerializer, RepairServiceSerializer, AccessoriesSerializer

def home(request):
    return HttpResponse("Welcome to the API homepage!")

class ProductViewSet(viewsets.ModelViewSet):
     queryset = Product.objects.all()
     serializer_class = ProductSerializer
     filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
     filterset_fields = ['brand']
     ordering_fields = ['name', 'price']

def get_queryset(self):
        return Product.objects.prefetch_related('colors').all()
    

@api_view(['GET'])
def product_list(request):
    
    queryset = Product.objects.all()
    paginator = PageNumberPagination()
    paginator.page_size = 1
    result_page = paginator.paginate_queryset(queryset, request)
    serializer = ProductSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)




class PhoneBrandViewSet(viewsets.ModelViewSet):
    queryset = PhoneBrand.objects.all()
    serializer_class = PhoneBrandSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['name']  # Allow filtering by brand name
    ordering_fields = ['name'] 



class PhoneModelViewSet(viewsets.ModelViewSet):
    queryset = PhoneModel.objects.select_related('brand').prefetch_related('repair_services').all()
    serializer_class = PhoneModelSerializer

    def get_queryset(self):
        
        queryset = super().get_queryset()
        brand_name = self.request.query_params.get('brandName', None)
        if brand_name is not None:
            queryset = queryset.filter(brand__name__iexact=brand_name)
        return queryset
    
    @action(detail=True, methods=['get'], url_path='repair-services')
    def get_repair_services(self, request, pk=None):
        phone_model = self.get_object()
        repair_services = RepairService.objects.filter(phone_model=phone_model)
        serializer = RepairServiceSerializer(repair_services, many=True)
        return Response(serializer.data)
    


class AccessoriesViewSet(viewsets.ModelViewSet):
     queryset = Accessories.objects.all()
     serializer_class = AccessoriesSerializer
