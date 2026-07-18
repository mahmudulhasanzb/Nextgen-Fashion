'use client';

import React, { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Star, ArrowLeft } from 'lucide-react';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import toast from 'react-hot-toast';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    notFound();
  }

  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const [activeImage, setActiveImage] = useState(product.images?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const handleWishlist = () => {
    toggleWishlist(product);
    toast.success(wishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container-site">
        {/* Back Link */}
        <Link 
          href="/products" 
          className="inline-flex items-center gap-2 mb-8 text-sm hover:text-[var(--color-accent)] transition-colors"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <ArrowLeft size={16} />
          Back to all products
        </Link>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          
          {/* Left: Images */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 border" style={{ borderColor: 'var(--color-border)' }}>
              {activeImage ? (
                <Image
                  src={activeImage}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-zinc-500">No Image</div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className="relative w-20 h-24 overflow-hidden bg-zinc-900 border transition-colors cursor-pointer"
                    style={{ borderColor: activeImage === img ? 'var(--color-accent)' : 'var(--color-border)' }}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      fill
                      className="object-cover object-top"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="label-overline">{product.category}</span>
              <h1 className="text-3xl font-bold mt-2" style={{ color: 'var(--color-text-primary)' }}>
                {product.name}
              </h1>
            </div>

            {/* Rating & Price */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <Star size={16} className="fill-[var(--color-accent)] text-[var(--color-accent)]" />
                <span className="text-sm font-semibold">{product.rating}</span>
              </div>
              <span className="text-2xl font-bold text-white">৳ {product.price}</span>
            </div>

            <hr style={{ borderColor: 'var(--color-border)' }} />

            {/* Description */}
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              {product.description}
            </p>

            {/* Options selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider block mb-2" style={{ color: 'var(--color-text-muted)' }}>
                  Color
                </span>
                <div className="flex gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className="px-3 py-1.5 text-xs font-medium uppercase border cursor-pointer transition-colors"
                      style={{
                        backgroundColor: selectedColor === color ? 'var(--color-accent)' : 'transparent',
                        color: selectedColor === color ? 'var(--color-bg)' : 'var(--color-text-muted)',
                        borderColor: selectedColor === color ? 'var(--color-accent)' : 'var(--color-border)',
                      }}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider block mb-2" style={{ color: 'var(--color-text-muted)' }}>
                  Size
                </span>
                <div className="flex gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className="w-10 h-10 flex items-center justify-center text-xs font-bold border cursor-pointer transition-colors"
                      style={{
                        backgroundColor: selectedSize === size ? 'var(--color-accent)' : 'transparent',
                        color: selectedSize === size ? 'var(--color-bg)' : 'var(--color-text-muted)',
                        borderColor: selectedSize === size ? 'var(--color-accent)' : 'var(--color-border)',
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="btn-accent flex-1 flex items-center justify-center gap-2 py-3 font-semibold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <ShoppingBag size={18} />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              
              <button
                onClick={handleWishlist}
                className="btn-ghost p-3 flex items-center justify-center cursor-pointer transition-colors"
                style={{ borderColor: 'var(--color-border)' }}
                aria-label="Add to wishlist"
              >
                <Heart size={20} className={wishlisted ? 'fill-red-400 text-red-400 border-none' : 'text-white'} />
              </button>
            </div>

            {/* Extra product details */}
            {product.details && (
              <div className="mt-6 p-4 rounded" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                <span className="text-xs font-bold uppercase tracking-wider block mb-2" style={{ color: 'var(--color-text-primary)' }}>
                  Product Details
                </span>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                  {product.details}
                </p>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
