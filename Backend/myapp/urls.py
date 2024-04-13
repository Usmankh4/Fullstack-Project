from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, PhoneBrandViewSet, home,  PhoneModelViewSet, AccessoriesViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'phone-brands', PhoneBrandViewSet)
router.register(r'phone-models', PhoneModelViewSet)
router.register(r'accessories', AccessoriesViewSet)



urlpatterns = [
    path('api/', include(router.urls)),
    path('', home, name='home'),
]
