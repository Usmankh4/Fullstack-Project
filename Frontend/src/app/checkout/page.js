"use client";
import React, { useState, useEffect } from 'react';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { useCart } from "@/app/cart/CartContext";
import { useRouter } from 'next/navigation';

const getCartFromStorage = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

const CheckoutPage = () => {
  const { cartItems, setCartItems } = useCart(); 
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


const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="page-container">
      <div className="content-wrap">
        <Header cartItems={cartItems}/>
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
                    <p> Colour: {item.color}</p>
                    <p> Storage: {item.storage}</p>
                    <p>Quantity: {item.quantity}</p> 
                    
                    
                  </div>
                  <div className="RemoveButton">
                    <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                  </div>
                </div>
              ))}
              <div className="CartTotal">
                        <h2>Total: ${totalAmount.toFixed(2)}</h2>
                    </div>
            </div>
          ) : (
            <div className="CartPage">
              <h1>Your cart is empty</h1>
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default CheckoutPage;