import { Suspense } from 'react';
import Footer from "../../../../components/footer";
import Header from "../../../../components/header";
import { ProductDetails } from './product-details';
import { ProductNotFound } from './product-not-found';

// Metadata generation for dynamic routes
export async function generateMetadata({ params }) {
  const { brand, product } = params;
  
  try {
    const productData = await getProduct(product);
    return {
      title: productData.name,
      description: `Buy ${productData.name} - ${productData.description.substring(0, 160)}`,
    };
  } catch (error) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found',
    };
  }
}

// Server-side data fetching
async function getProduct(productIdentifier) {
  try {
    // Try to fetch by slug first
    let response = await fetch(
      `http://localhost:8000/myapp/api/products/?slug=${encodeURIComponent(productIdentifier)}`,
      { 
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      }
    );
    
    let data = await response.json();
    
    // If we found a product by slug, return the first result
    if (response.ok && data.results && data.results.length > 0) {
      return data.results[0];
    }
    
    // If not found by slug, try to fetch by ID as fallback
    response = await fetch(
      `http://localhost:8000/myapp/api/products/${productIdentifier}`,
      { 
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

export default async function ProductPage({ params }) {
  const { product } = params;
  
  try {
    const productData = await getProduct(product);
    
    return (
      <div>
        <Header />
        <Suspense fallback={<div className="loading">Loading product details...</div>}>
          <ProductDetails productData={productData} />
        </Suspense>
        <Footer />
      </div>
    );
  } catch (error) {
    return (
      <div>
        <Header />
        <ProductNotFound />
        <Footer />
      </div>
    );
  }
}
