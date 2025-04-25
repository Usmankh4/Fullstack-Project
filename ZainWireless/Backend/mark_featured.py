import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
django.setup()

# Import the Product model
from myapp.models import Product

def mark_products_as_featured():
    # Get the first 3 products
    products = Product.objects.all()[:3]
    
    if not products:
        print("No products found in the database.")
        return
    
    # Mark them as featured
    for product in products:
        product.featured = True
        product.save()
        print(f"Marked product '{product.name}' as featured.")
    
    # Confirm the number of featured products
    featured_count = Product.objects.filter(featured=True).count()
    print(f"\nTotal featured products: {featured_count}")

if __name__ == "__main__":
    mark_products_as_featured()
