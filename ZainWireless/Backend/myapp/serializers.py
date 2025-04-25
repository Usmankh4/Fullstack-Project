from rest_framework import serializers
from .models import Product, Color, StorageOption, ProductColorImage, PhoneBrand, PhoneModel,RepairService, Accessories
from django.contrib.auth.models import User
from rest_framework import serializers

class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ['id', 'name']


class StorageOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = StorageOption
        fields = ['id', 'storage_amount', 'price']

class RepairServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = RepairService
        fields = ['id', 'service_type', 'price']


class ProductColorImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductColorImage
        fields = ['color_name', 'image', 'countInStock']

class ProductSerializer(serializers.ModelSerializer):
    colors = ColorSerializer(many=True, read_only=True)
    storage_options = StorageOptionSerializer(many=True, read_only=True)
    color_images = ProductColorImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'image', 'brand', 'rating', 'price', 'countInStock', 'createdAt', 'colors', 'storage_options', 'color_images', 'description', 'featured']




class AccessoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Accessories
        fields = '__all__'


class PhoneModelSerializer(serializers.ModelSerializer):
    repair_services = RepairServiceSerializer(many=True, read_only=True)

    class Meta:
        model = PhoneModel
        fields = ['id', 'name', 'image', 'repair_services']

class PhoneBrandSerializer(serializers.ModelSerializer):
    models = PhoneModelSerializer(many=True, read_only=True)  # This will include related models in the serialization

    class Meta:
        model = PhoneBrand
        fields = ['id', 'name', 'logo', 'models']

        
