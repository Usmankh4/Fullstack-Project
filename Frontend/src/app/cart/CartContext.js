"use client";
import { createContext, useState, useContext, useCallback, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => getCartFromStorage());
  const [stockData, setStockData] = useState({});

  const fetchStockData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/myapp/api/stock-data/');
      setStockData(response.data);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    localStorage.removeItem('cart');
  }, []);

  const value = {
    cartItems,
    setCartItems,
    clearCart,
    stockData,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function getCartFromStorage() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}
