from django.contrib import admin
from .models import *

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'brand', 'price', 'countInStock', 'featured')
    list_filter = ('brand', 'featured')
    search_fields = ('name', 'brand')
    list_editable = ('featured',)

# Register your models here.
admin.site.register(Product, ProductAdmin)
admin.site.register(Color)
admin.site.register(StorageOption)
admin.site.register(ProductColorImage)
admin.site.register(PhoneBrand)
admin.site.register(PhoneModel)
admin.site.register(RepairService)
admin.site.register(Accessories)
