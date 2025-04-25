from ast import Or
from operator import mod
from django.db import models
from django.core.exceptions import ValidationError
import stripe
from django.utils.text import slugify

# Create your models here.
from django.conf import settings

stripe.api_key = "sk_test_51P6GyV00AEQJL4BQfcA38jqXzCL1peWSeVdHKOsNU55GEZvN95ZqFyAECbB3c1dY5wJTNxPSybclAtVMdBnHLMFo00c9L93Cl3"
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
    name = models.CharField(max_length=200,null=True,blank=True)
    slug = models.SlugField(max_length=255, unique=True, null=True, blank=True)
    image = models.ImageField(null=True,blank = True)
    brand = models.CharField(max_length=200,null=True,blank=True)
    rating = models.DecimalField(max_digits=7,decimal_places=2,null=True,blank=True)
    price =  models.DecimalField(max_digits=7,decimal_places=2,null=True,blank=True)
    countInStock = models.IntegerField(null=True,blank=True,default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    colors = models.ManyToManyField('Color', related_name='products', blank=True)
    id = models.AutoField(primary_key=True,editable=False)
    description = models.TextField(null=True, blank=True)
    stripe_id = models.CharField(max_length=100, null=True, blank=True)  # This will store the ID of the product on Stripe
    price_id = models.CharField(max_length=100, null=True, blank=True)  # This will store the URL of the product on Stripe
    featured = models.BooleanField(default=False)  # New field to mark products as featured

    def save(self, *args, **kwargs):
        if not self.slug and self.name:
            # Generate a slug from the name
            base_slug = slugify(self.name)
            slug = base_slug
            # Ensure the slug is unique
            counter = 1
            while Product.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
            
        if self.price is None:
            # If price is None, set a default or handle it appropriately
            # For example, you might want to skip Stripe integration if price is not set
            super().save(*args, **kwargs)
            return
            
        if(self.price_id is None):
            stripe_product = stripe.Product.create(name=self.name, default_price_data={'currency': 'cad', 'unit_amount_decimal': self.price*100})
            self.stripe_id = stripe_product.id
            self.price_id = stripe_product.default_price
        elif(self.price_id is not None):
    
            stripe_product = stripe.Product.retrieve(self.stripe_id)  
            new_price_id = stripe.Price.create(
                product = self.stripe_id,
                currency = 'cad',
                unit_amount_decimal = self.price*100,
                active=True
            )
            #update product with new price
            stripe.Product.modify(self.stripe_id, name=self.name,default_price=new_price_id.id)
            self.price_id  = new_price_id.id
    
            
        super().save(*args, **kwargs)  # Call the "real" save() method.
    def __str__(self):
        return self.name
    

class Accessories(models.Model):
    
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
    countInStock = models.IntegerField(null=True, blank=True, default=0)

    def __str__(self):
        return f"{self.product.name} - {self.color_name}"



class StorageOption(models.Model):
    product = models.ForeignKey(Product, related_name='storage_options', on_delete=models.CASCADE)
    storage_amount = models.CharField(max_length=50)  
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # This now directly stores the price for this storage option

    def __str__(self):
        return f"{self.product.name} - {self.storage_amount} - Price: ${self.price}"

    def save(self, *args, **kwargs):
        # Always ensure we have a price
        if self.price is None and self.product and self.product.price:
            self.price = self.product.price
        super().save(*args, **kwargs)
    
    

    

class Order(models.Model):
    
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