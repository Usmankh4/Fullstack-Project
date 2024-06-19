from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, PhoneBrandViewSet, home, PhoneModelViewSet, AccessoriesViewSet, create_checkout_session, create_cart_checkout_session

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'phone-brands', PhoneBrandViewSet)
router.register(r'phone-models', PhoneModelViewSet)
router.register(r'accessories', AccessoriesViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/create-checkout-session/', create_checkout_session, name='create-checkout-session'),
    path('api/create-cart-checkout-session/', create_cart_checkout_session, name='create-cart-checkout-session'),
    path('', home, name='home'),
    
]
