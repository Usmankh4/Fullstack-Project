import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
django.setup()

# Import models
from myapp.models import Product
from django.utils.text import slugify

# Generate slugs for all products
for product in Product.objects.all():
    if not product.slug:
        base_slug = slugify(product.name)
        slug = base_slug
        counter = 1
        while Product.objects.filter(slug=slug).exists() and Product.objects.get(slug=slug) != product:
            slug = f"{base_slug}-{counter}"
            counter += 1
        product.slug = slug
        product.save()
        print(f'Generated slug for {product.name}: {product.slug}')
    else:
        print(f'Product {product.name} already has slug: {product.slug}')
