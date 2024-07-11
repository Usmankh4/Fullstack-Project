"use client";
import React, { useEffect } from 'react';
import Footer from "../../components/footer";
import Header from "../../components/header";
import { useCart } from "../cart/CartContext";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const CheckoutPage = () => {
  const { cartItems, setCartItems, clearCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    setCartItems(getCartFromStorage());
  }, [setCartItems]);

  const handleRemoveFromCart = (id) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    }).filter(item => item.quantity > 0);

    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const navigateToProduct = (productId, brand) => {
    router.push(`/products/${brand}/${productId}`);
  };

  const handleCheckout = async () => {
    try {
        const response = await axios.post('/api/create-checkout-session/', { cart: cartItems });
        const { sessionId } = response.data;
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (!error) {
            await axios.post('/api/update-stock/', {
                product_id: phone.id,
                quantity: quantity,
            });
            clearCart();
            router.push('/success');
        } else {
            console.error('Error redirecting to Stripe checkout:', error);
        }
    } catch (error) {
        console.error('Error creating checkout session:', error);
    }
};


  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="page-container">
      <div className="content-wrap">
        <Header cartItems={cartItems} />
        <div className="pageAfterHeader">
          {cartItems.length > 0 ? (
            <div className="CartPage">
              <h1>Your Cart Page</h1>
              {cartItems.map((item) => (
                <div key={item.id} className="CartItem">
                  <div className="productImage" onClick={() => navigateToProduct(item.productId, item.brand)}>
                    <img src={item.image} alt={item.name} style={{ cursor: 'pointer' }} />
                  </div>
                  <div className="ProductDetails">
                    <h3>{item.name}</h3>
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p> Colour: {item.color}</p>
                    <p> Storage: {item.storage}</p>
                    <p> Stock: {item.countInStock}</p>
                  </div>
                  <div className="RemoveButton">
                    <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                  </div>
                </div>
              ))}
              <div className="CartTotal">
                <div className="TotalAmount">
                  <h2>Total: ${totalAmount.toFixed(2)}</h2>
                </div>
                <div className="CheckoutButton">
                  <button onClick={handleCheckout}>Checkout</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="CartPage">
              <h1>Your cart is empty</h1>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;

const getCartFromStorage = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};
