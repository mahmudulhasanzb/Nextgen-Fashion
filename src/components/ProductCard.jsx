'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [imgError, setImgError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const wishlisted = isWishlisted(product.id);
  const primaryImage = product.images?.[0] ?? '';

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;
    setIsAdding(true);
    addToCart(product);
    toast.success(`${product.name} added to cart`);
    setTimeout(() => setIsAdding(false), 800);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    toast(wishlisted ? 'Removed from wishlist' : 'Added to wishlist', {
      icon: wishlisted ? '💔' : '❤️',
    });
  };


  return (
    <article
      className="group relative flex flex-col overflow-hidden transition-all duration-300"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
      }}
    >
      <Link
        href={`/products/${product.id}`}
        aria-label={`View ${product.name}`}
      >
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-[3/4] bg-[#0E1106]">
          {primaryImage && !imgError ? (
            <Image
              src={primaryImage}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover object-top"
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ color: 'var(--color-text-faint)' }}
            >
              <ShoppingBag size={40} strokeWidth={1} />
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {!product.inStock && (
              <span
                className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                style={{ background: 'rgba(239,68,68,0.9)', color: '#fff' }}
              >
                Sold Out
              </span>
            )}
            {product.rating >= 4.8 && product.inStock && (
              <span
                className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                style={{
                  background: 'var(--color-accent)',
                  color: 'var(--color-bg)',
                }}
              >
                Bestseller
              </span>
            )}
          </div>

          {/* Wishlist button */}
          <button
            onClick={handleWishlist}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            className="absolute backdrop-blur-sm rounded-full bg-red-400/40 top-3 right-3 z-10 flex items-center justify-center w-8 h-8 transition-all duration-200 cursor-pointer"
          >
            <Heart
              size={15}
              className={
                wishlisted ? 'fill-red-400 text-red-400' : 'text-white'
              }
              strokeWidth={wishlisted ? 0 : 1.5}
            />
          </button>
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-2 p-3.5">
          <span
            className="text-[10px] font-semibold uppercase tracking-widest"
            style={{ color: 'var(--color-text-faint)' }}
          >
            {product.category}
          </span>

          <h3
            className="font-semibold text-sm leading-snug line-clamp-2 transition-colors duration-150"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {product.name}
          </h3>

          {/* Rating + Price row */}
          <div className="flex items-center justify-between mt-0.5">
            <div className="flex items-center gap-1">
              <Star
                size={11}
                className="fill-[var(--color-accent)] text-[var(--color-accent)]"
              />
              <span
                className="text-[11px] font-medium"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {product.rating.toFixed(1)}
              </span>
            </div>

            {/* Price */}
            <span
              className="text-sm font-bold"
              style={{ color: 'var(--color-text-primary)' }}
            >
              ৳ {product.price}
            </span>
          </div>
        </div>
      </Link>

      {/* Add to Cart */}
      <button
        onClick={handleAddToCart}
        disabled={!product.inStock || isAdding}
        className={`w-full py-2.5 text-[11px] tracking-widest transition-all duration-200 uppercase font-bold cursor-pointer ${product.inStock ? 'bg-[#D4FF00] text-black hover:bg-[#D4FF00]/80' : 'bg-[#101600] border-1 border-[#2e3120] text-[#A4A896]/70'}`}
      >
        {!product.inStock
          ? 'Out of Stock'
          : isAdding
            ? 'Adding…'
            : 'Add to Cart'}
      </button>
    </article>
  );
};

export default ProductCard;