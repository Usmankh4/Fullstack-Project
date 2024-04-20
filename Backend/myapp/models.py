from ast import Or
from operator import mod
from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError


# Create your models here.

class PhoneBrand(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    logo = models.ImageField(null=True, blank=True)

    def __str__(self):
        return self.name

class PhoneModel(models.Model):
    brand = models.ForeignKey(PhoneBrand, related_name='models', on_delete=models.CASCADE)
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True)

    def __str__(self):
        return f"{self.brand.name} {self.name}"
    
class RepairService(models.Model):
    phone_model = models.ForeignKey(PhoneModel, related_name='repair_services', on_delete=models.CASCADE)
    service_type = models.CharField(max_length=200)
    price = models.CharField(max_length=100) 

    def __str__(self):
        return f"{self.phone_model.brand.name} {self.phone_model.name} - {self.service_type}"


class Product(models.Model):
    product_type= models.CharField(max_length=15, null=True, blank=True)
    user = models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    name = models.CharField(max_length=200,null=True,blank=True)
    image = models.ImageField(null=True,blank = True)
    brand = models.CharField(max_length=200,null=True,blank=True)
    category = models.CharField(max_length=200,null=True,blank=True)
    rating = models.DecimalField(max_digits=7,decimal_places=2,null=True,blank=True)
    price =  models.DecimalField(max_digits=7,decimal_places=2,null=True,blank=True)
    countInStock = models.IntegerField(null=True,blank=True,default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    colors = models.ManyToManyField('Color', related_name='products', blank=True)
    id = models.AutoField(primary_key=True,editable=False)

    def __str__(self):
        return self.name
    

class Accessories(models.Model):
    user = models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    name = models.CharField(max_length=200,null=True,blank=True)
    brand = models.CharField(max_length=200,null=True,blank=True)
    image = models.ImageField(null=True,blank = True)
    price =  models.DecimalField(max_digits=7,decimal_places=2,null=True,blank=True)
    id = models.AutoField(primary_key=True,editable=False)
    
    def __str__(self):
        return self.name
    
class Color(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class ProductColorImage(models.Model):
    product = models.ForeignKey(Product, related_name='color_images', on_delete=models.CASCADE)
    color_name = models.CharField(max_length=100, null=True)
    image = models.ImageField(null=True, blank=True)

    def __str__(self):
        return f"{self.product.name} - {self.color_name}"


class StorageOption(models.Model):
    product = models.ForeignKey(Product, related_name='storage_options', on_delete=models.CASCADE)
    storage_amount = models.CharField(max_length=50)  
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # This now directly stores the price for this storage option

    def __str__(self):
        return f"{self.product.name} - {self.storage_amount} - Price: ${self.price}"

    def save(self, *args, **kwargs):
        if self.price is None:  
            self.price = self.product.price
        super(StorageOption, self).save(*args, **kwargs)
    
    

    

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    taxPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.createdAt)

class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True)
    id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name

class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    postalCode = models.CharField(max_length=200, null=True, blank=True)
    country = models.CharField(max_length=200, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.address