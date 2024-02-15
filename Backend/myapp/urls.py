from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, home  

router = DefaultRouter()
router.register(r'products', ProductViewSet)


urlpatterns = [
   
    path('api/', include (router.urls)),
    path('', home, name='home'), 
    
]