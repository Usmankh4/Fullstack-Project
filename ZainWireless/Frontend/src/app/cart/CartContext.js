"use client";

import { createContext, useState, useContext, useCallback, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isClient, setIsClient] = useState(false);

  // Initialize cart from localStorage only on the client side
  useEffect(() => {
    setIsClient(true);
    setCartItems(getCartFromStorage());
  }, []);

  // Update localStorage whenever cartItems changes
  useEffect(() => {
    if (isClient && cartItems.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isClient]);

  const clearCart = useCallback(() => {
    setCartItems([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
    }
  }, []);

  const value = {
    cartItems,
    setCartItems,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function getCartFromStorage() {
  if (typeof window === 'undefined') {
    return [];
  }
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}
