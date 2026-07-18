'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';

export function Providers({ children }) {
  return (
    <CartProvider>
      <WishlistProvider>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 2500,
            style: {
              background: '#141A08',
              color: '#FFFFFF',
              border: '1px solid #1C210E',
              borderRadius: '4px',
              fontSize: '13px',
              fontWeight: '500',
            },
            success: {
              iconTheme: {
                primary: '#D4FF00',
                secondary: '#141A08',
              },
            },
          }}
        />
      </WishlistProvider>
    </CartProvider>
  );
}
