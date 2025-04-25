"use client";

import { CartProvider } from "./cart/CartContext";

export function CartProviderWrapper({ children }) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
}
