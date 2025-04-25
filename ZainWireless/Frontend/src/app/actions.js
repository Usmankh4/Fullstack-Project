'use server';

import { revalidatePath } from 'next/cache';

/**
 * Fetches products from the API with server-side caching
 * @param {string} brand - The brand to filter products by
 * @param {number} page - The page number for pagination
 * @returns {Promise<Object>} - The products data
 */
export async function fetchProducts(brand, page = 1) {
  try {
    const response = await fetch(
      `http://localhost:8000/myapp/api/products/?brand=${brand}&page=${page}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return { results: [], count: 0 };
  }
}

/**
 * Fetches a single product from the API with server-side caching
 * @param {string} productId - The ID of the product to fetch
 * @returns {Promise<Object>} - The product data
 */
export async function fetchProduct(productId) {
  try {
    const response = await fetch(
      `http://localhost:8000/myapp/api/products/${productId}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
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

/**
 * Creates a checkout session with Stripe
 * @param {Object} formData - The form data containing cart items
 * @returns {Promise<Object>} - The checkout session data
 */
export async function createCheckoutSession(formData) {
  try {
    const cart = formData.get('cart');
    const parsedCart = JSON.parse(cart);
    
    const response = await fetch('http://localhost:8000/myapp/api/create-cart-checkout-session/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cart: parsedCart }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create checkout session: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

/**
 * Submits a contact form
 * @param {FormData} formData - The form data
 * @returns {Promise<Object>} - The response data
 */
export async function submitContactForm(formData) {
  try {
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    const response = await fetch('http://localhost:8000/myapp/api/contact/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to submit contact form: ${response.status}`);
    }
    
    // Revalidate the contact page to show the success message
    revalidatePath('/contactus');
    
    return { success: true };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { success: false, error: error.message };
  }
}
