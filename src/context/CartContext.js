'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('nextgen_cart');
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (e) {
        console.error('Failed to parse cart data from localStorage', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Sync to localStorage when cart changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('nextgen_cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  const addToCart = (product, color, size, quantity = 1) => {
    setCartItems((prevItems) => {
      // Find if item already exists with same product ID, color, and size
      const existingItemIndex = prevItems.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.color === color &&
          item.size === size
      );

      if (existingItemIndex > -1) {
        // If it exists, update the quantity
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      } else {
        // Otherwise, add a new item with a unique composite key
        const cartItemId = `${product.id}-${color}-${size}`;
        return [...prevItems, { id: cartItemId, product, color, size, quantity }];
      }
    });
  };

  const removeFromCart = (cartItemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const vat = Math.round(subtotal * 0.05); // 5% VAT
  const shipping = subtotal > 2500 || subtotal === 0 ? 0 : 120; // Free shipping over 2500
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const total = subtotal + vat + shipping;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        subtotal,
        vat,
        shipping,
        total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isLoaded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
