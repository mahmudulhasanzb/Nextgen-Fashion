'use client';

import { createContext, useContext, useState } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  function addToWishlist(product) {
    setWishlist(prev => [...prev, product]);
  }

  function removeFromWishlist(id) {
    setWishlist(prev => prev.filter(i => i.id !== id));
  }

  function isWishlisted(id) {
    return wishlist.some(i => i.id === id);
  }

  function toggleWishlist(product) {
    if (isWishlisted(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  }

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
