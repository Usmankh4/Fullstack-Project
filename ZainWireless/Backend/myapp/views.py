import json
import stripe
from decimal import Decimal
from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets, views, filters
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from .models import Order, OrderItem, Product, PhoneBrand, PhoneModel, RepairService, Accessories
from .serializers import (
    ProductSerializer, 
    PhoneBrandSerializer, 
    PhoneModelSerializer, 
    RepairServiceSerializer, 
    AccessoriesSerializer
)
from datetime import datetime

stripe.api_key = "sk_test_51P6GyV00AEQJL4BQfcA38jqXzCL1peWSeVdHKOsNU55GEZvN95ZqFyAECbB3c1dY5wJTNxPSybclAtVMdBnHLMFo00c9L93Cl3"

def home(request):
    return HttpResponse("Welcome to the API homepage!")

def search_products(request):
    query = request.GET.get('q', '')
    if query:
        products = Product.objects.filter(name__icontains=query)
    else:
        products = Product.objects.all()
    product_list = list(products.values())
    return JsonResponse(product_list, safe=False)

@api_view(['GET'])
def api_search_products(request):
    """
    API endpoint to search products by name
    """
    query = request.query_params.get('q', '')
    print(f"Search query received: '{query}'")  # Debug logging
    
    if not query:
        print("No query provided, returning empty results")
        return Response({'results': [], 'count': 0})
    
    # Simplified search implementation with extensive debugging
    print(f"All products in database:")
    all_products = Product.objects.all()
    for p in all_products:
        print(f"ID: {p.id}, Name: {p.name}, Brand: {p.brand}, Slug: {p.slug}")
    
    # Simple case-insensitive search on name or brand
    products = Product.objects.filter(
        name__icontains=query
    )
    
    print(f"Found {products.count()} products matching name")
    
    # Debug: Print all found products
    for product in products:
        print(f"Found product: ID={product.id}, Name='{product.name}', Brand='{product.brand}'")
    
    serializer = ProductSerializer(products, many=True)
    return Response({
        'results': serializer.data,
        'count': products.count()
    })

class ProductViewSet(viewsets.ModelViewSet):
     queryset = Product.objects.all()
     serializer_class = ProductSerializer
     filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
     filterset_fields = ['brand', 'slug']
     ordering_fields = ['name', 'price']

     def get_queryset(self):
         queryset = Product.objects.prefetch_related('colors', 'storage_options', 'color_images').all()
         
         # Add debug logging
         brand = self.request.query_params.get('brand', None)
         if brand:
             print(f"Filtering products by brand: {brand}")
             queryset = queryset.filter(brand__iexact=brand)
             print(f"Found {queryset.count()} products for brand: {brand}")
             # Print the first few products to debug
             for product in queryset[:3]:
                 print(f"Product: {product.id} - {product.name} - Brand: {product.brand}")
         
         return queryset
    
    

@api_view(['GET'])
def product_list(request):
    brand = request.query_params.get('brand', None)
    queryset = Product.objects.all().order_by('id')
    
    if brand:
        queryset = queryset.filter(brand__name__iexact=brand)

    paginator = PageNumberPagination()
    paginator.page_size = 5  # Adjust the page size to match frontend expectations
    result_page = paginator.paginate_queryset(queryset, request)
    serializer = ProductSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
def featured_products(request):
    """
    API endpoint to fetch featured products
    """
    queryset = Product.objects.filter(featured=True).order_by('id')
    serializer = ProductSerializer(queryset, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def test_api(request):
    """
    Simple test endpoint to verify API is working
    """
    return Response({
        'status': 'success',
        'message': 'API is working correctly',
        'timestamp': str(datetime.now())
    })




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


def get_stock_data(request):
    products = Product.objects.all()
    stock_data = {product.id: product.countInStock for product in products}
    return JsonResponse(stock_data)



@csrf_exempt
def create_checkout_session(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        product_id = data['productId']
        product = Product.objects.get(id=product_id)
        price = Decimal(data['price'])
        quantity = data['quantity']
        image = data['image']

        if quantity > product.countInStock:
            return JsonResponse({'error': 'Quantity exceeds stock for ' + product.name}, status=400)

        # Reserve the stock
        product.countInStock -= quantity
        product.save()

        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'cad',
                    'product_data': {
                        'name': product.name,
                        'images': [image],  
                    },
                    'unit_amount': int(price * 100),  
                },
                'quantity': quantity,
                'tax_rates': ['txr_1POoav00AEQJL4BQUWiXsRJO']
            }],
            shipping_address_collection={
                'allowed_countries': ['CA', 'US']
            },
            shipping_options=[
                {
                    'shipping_rate_data': {
                        'type': 'fixed_amount',
                        'fixed_amount': {
                            'amount': 1000,
                            'currency': 'cad',
                        },
                        'display_name': 'Standard Shipping',
                        'delivery_estimate': {
                            'minimum': {
                                'unit': 'business_day',
                                'value': 5,
                            },
                            'maximum': {
                                'unit': 'business_day',
                                'value': 7,
                            },
                        }
                    }
                },
                {
                    'shipping_rate_data': {
                        'type': 'fixed_amount',
                        'fixed_amount': {
                            'amount': 1500,
                            'currency': 'cad',
                        },
                        'display_name': 'Next day air',
                        'delivery_estimate': {
                            'minimum': {
                                'unit': 'business_day',
                                'value': 1,
                            },
                            'maximum': {
                                'unit': 'business_day',
                                'value': 1,
                            },
                        }
                    }
                }
            ],
            mode='payment',
            success_url='http://localhost:3000/success',
            cancel_url='http://localhost:3000/cancel',
        )

        return JsonResponse({'sessionId': session.id})

    return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def create_cart_checkout_session(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        cart = data['cart']

        line_items = []

        for item in cart:
            product = Product.objects.get(id=item['productId'])
            item_price = Decimal(item['price'])
            item_quantity = item['quantity']

            if item_quantity > product.countInStock:
                return JsonResponse({'error': 'Quantity exceeds stock for ' + product.name}, status=400)

            # Reserve the stock
            product.countInStock -= item_quantity
            product.save()

            line_items.append({
                'price_data': {
                    'currency': 'cad',
                    'product_data': {
                        'name': item['name'],
                        'images': [item['image']],
                    },
                    'unit_amount': int(item_price * 100),
                },
                'quantity': item_quantity,
                'tax_rates': ['txr_1POoav00AEQJL4BQUWiXsRJO']
            })

        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=line_items,
            shipping_address_collection={
                'allowed_countries': ['CA', 'US']
            },
            shipping_options=[
                {
                    'shipping_rate_data': {
                        'type': 'fixed_amount',
                        'fixed_amount': {
                            'amount': 1000,
                            'currency': 'cad',
                        },
                        'display_name': 'Standard Shipping',
                        'delivery_estimate': {
                            'minimum': {
                                'unit': 'business_day',
                                'value': 5,
                            },
                            'maximum': {
                                'unit': 'business_day',
                                'value': 7,
                            },
                        }
                    }
                },
                {
                    'shipping_rate_data': {
                        'type': 'fixed_amount',
                        'fixed_amount': {
                            'amount': 1500,
                            'currency': 'cad',
                        },
                        'display_name': 'Next day air',
                        'delivery_estimate': {
                            'minimum': {
                                'unit': 'business_day',
                                'value': 1,
                            },
                            'maximum': {
                                'unit': 'business_day',
                                'value': 1,
                            },
                        }
                    }
                }
            ],
            mode='payment',
            success_url='http://localhost:3000/success',
            cancel_url='http://localhost:3000/cancel',
        )

        return JsonResponse({'sessionId': session.id})

    return JsonResponse({'error': 'Invalid request method'}, status=400)
