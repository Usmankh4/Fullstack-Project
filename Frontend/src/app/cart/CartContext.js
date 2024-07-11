"use client";

import { createContext, useState, useContext, useCallback } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => getCartFromStorage());

  const clearCart = useCallback(() => {
    setCartItems([]);
    localStorage.removeItem('cart');
  }, []);

  const value = {
    cartItems,
    setCartItems,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function getCartFromStorage() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}
