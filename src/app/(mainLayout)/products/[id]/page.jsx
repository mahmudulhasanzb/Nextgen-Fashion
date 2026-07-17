'use client';

import React, { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/data/products';
import { Star, Minus, Plus, Heart, ShoppingBag, ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export default function ProductDetailPage({ params }) {
  // Unwrap params using React.use() for Next.js 15/16 App Router compatibility
  const resolvedParams = use(params);
  const productId = parseInt(resolvedParams.id, 10);

  // Find product
  const product = products.find((p) => p.id === productId);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // States
  const [activeImage, setActiveImage] = useState(product ? product.images[0] : '');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [errorFeedback, setErrorFeedback] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const isWishlisted = product ? isInWishlist(product.id) : false;

  // If product not found
  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[hsl(0_0%_98%)] dark:bg-[hsl(240_10%_3.9%)] text-center px-4">
        <h2 className="text-2xl font-bold text-zinc-950 dark:text-zinc-50">Product Not Found</h2>
        <p className="text-zinc-500 mt-2">The product you are looking for does not exist.</p>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black text-xs font-semibold uppercase tracking-wider transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Catalog
        </Link>
      </div>
    );
  }

  // Set initial active image when product is loaded
  if (!activeImage && product.images.length > 0) {
    setActiveImage(product.images[0]);
  }

  const handleQuantityDecrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleQuantityIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    // Validation: Prevent addition to cart without selecting size or color (User Story 6.5)
    setErrorFeedback('');
    setSuccessMessage('');

    if (!selectedColor) {
      setErrorFeedback('Please select a color before adding to cart.');
      return;
    }
    if (!selectedSize) {
      setErrorFeedback('Please select a size before adding to cart.');
      return;
    }

    addToCart(product, selectedColor, selectedSize, quantity);

    setSuccessMessage(`Successfully added ${quantity}x ${product.name} (${selectedColor}, Size: ${selectedSize}) to your cart.`);
    
    // Clear message after 4 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[hsl(0_0%_98%)] dark:bg-[hsl(240_10%_3.9%)] text-[hsl(240_10%_3.9%)] dark:text-[hsl(0_0%_98%)] transition-colors duration-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[hsl(240_3.8%_46.1%)] dark:text-[hsl(240_5%_64.9%)] hover:text-black dark:hover:text-white transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Catalog
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* 1. Multi-Image Interactive Gallery (User Story 6.2) */}
          <div className="lg:col-span-7 flex flex-col md:flex-row-reverse gap-4">
            
            {/* Main Active Image */}
            <div className="relative aspect-[3/4] flex-1 bg-zinc-100 dark:bg-zinc-800/50 border border-[hsl(240_5%_64.9%)/0.1] overflow-hidden">
              {activeImage && (
                <Image
                  src={activeImage}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover object-center transition-transform duration-300 hover:scale-105"
                  sizes="(max-w-768px) 100vw, 50vw"
                />
              )}
              {!product.inStock && (
                <div className="absolute top-4 left-4 bg-black/75 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1">
                  Out of Stock
                </div>
              )}
            </div>

            {/* Thumbnails list */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-x-visible no-scrollbar">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-20 h-24 bg-zinc-100 dark:bg-zinc-800 border flex-shrink-0 transition-all ${
                    activeImage === img
                      ? 'border-black dark:border-white ring-1 ring-black dark:ring-white'
                      : 'border-[hsl(240_5%_64.9%)/0.1] hover:border-zinc-400 dark:hover:border-zinc-600'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} Thumbnail ${idx + 1}`}
                    fill
                    className="object-cover object-center"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* 2. Product Information & Configurators */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Category & Badge */}
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[hsl(240_3.8%_46.1%)] dark:text-[hsl(240_5%_64.9%)]">
                {product.category}
              </span>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight uppercase text-zinc-900 dark:text-white mt-2">
                {product.name}
              </h1>

              {/* Price & Rating */}
              <div className="flex items-center gap-6 mt-4 pb-6 border-b border-[hsl(240_5%_64.9%)/0.1]">
                <span className="text-2xl font-bold text-[hsl(142_70%_29%)] dark:text-[hsl(142_76%_36%)]">
                  ৳{product.price}
                </span>
                
                <div className="flex items-center gap-1.5 border-l border-zinc-200 dark:border-zinc-800 pl-6">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-semibold">{product.rating}</span>
                  <span className="text-xs text-[hsl(240_3.8%_46.1%)] dark:text-[hsl(240_5%_64.9%)] ml-1">
                    (Highly Rated)
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="py-6 space-y-4">
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                  {product.description}
                </p>
              </div>

              {/* Validation/Feedback Alerts */}
              {errorFeedback && (
                <div className="flex items-center gap-2.5 p-3.5 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 text-red-600 dark:text-red-400 text-xs font-medium uppercase tracking-wider mb-6">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorFeedback}</span>
                </div>
              )}

              {successMessage && (
                <div className="flex items-center gap-2.5 p-3.5 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 text-green-700 dark:text-green-400 text-xs font-medium uppercase tracking-wider mb-6">
                  <Check className="w-4 h-4 flex-shrink-0" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Color Swatches Selector (User Story 6.3) */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider">
                  <span>Color:</span>
                  <span className="text-[hsl(240_3.8%_46.1%)] dark:text-[hsl(240_5%_64.9%)]">
                    {selectedColor || 'Choose options'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        setSelectedColor(color);
                        setErrorFeedback('');
                      }}
                      className={`px-4 py-2 text-xs font-medium uppercase tracking-wider border transition-all ${
                        selectedColor === color
                          ? 'border-black dark:border-white bg-black text-white dark:bg-white dark:text-black font-semibold'
                          : 'border-[hsl(240_5%_64.9%)/0.2] hover:border-zinc-400 dark:hover:border-zinc-600 bg-white dark:bg-[hsl(240_6%_15%)]'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Buttons Selector (User Story 6.3) */}
              <div className="space-y-3 mb-8">
                <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider">
                  <span>Size:</span>
                  <span className="text-[hsl(240_3.8%_46.1%)] dark:text-[hsl(240_5%_64.9%)]">
                    {selectedSize || 'Choose options'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size);
                        setErrorFeedback('');
                      }}
                      className={`min-w-[40px] h-10 flex items-center justify-center text-xs font-medium uppercase border transition-all ${
                        selectedSize === size
                          ? 'border-black dark:border-white bg-black text-white dark:bg-white dark:text-black font-bold'
                          : 'border-[hsl(240_5%_64.9%)/0.2] hover:border-zinc-400 dark:hover:border-zinc-600 bg-white dark:bg-[hsl(240_6%_15%)]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CTAs & Quantity Adjust Controls (User Story 6.4) */}
            <div className="space-y-4 pt-6 border-t border-[hsl(240_5%_64.9%)/0.1]">
              <div className="flex items-center gap-4">
                {/* Quantity Adjuster */}
                <div className="flex items-center border border-[hsl(240_5%_64.9%)/0.2] bg-white dark:bg-[hsl(240_6%_15%)]">
                  <button
                    onClick={handleQuantityDecrement}
                    disabled={!product.inStock}
                    className="p-3 text-zinc-500 hover:text-black dark:hover:text-white transition-all disabled:opacity-50"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-semibold select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={handleQuantityIncrement}
                    disabled={!product.inStock}
                    className="p-3 text-zinc-500 hover:text-black dark:hover:text-white transition-all disabled:opacity-50"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart CTA */}
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-black dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 text-white dark:text-black text-xs font-semibold uppercase tracking-wider transition-all disabled:bg-zinc-300 dark:disabled:bg-zinc-800 disabled:text-zinc-500 dark:disabled:text-zinc-600 disabled:cursor-not-allowed"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {product.inStock ? 'Add to Cart' : 'Sold Out'}
                </button>
              </div>

              {/* Wishlist CTA */}
              <button
                onClick={() => toggleWishlist(product)}
                className="w-full flex items-center justify-center gap-2 py-3 border border-[hsl(240_10%_3.9%)] dark:border-[hsl(0_0%_98%)] hover:bg-[hsl(240_10%_3.9%)] hover:text-white dark:hover:bg-[hsl(0_0%_98%)] dark:hover:text-black text-xs font-semibold uppercase tracking-wider transition-all"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>
            </div>

          </div>
        </div>

        {/* 3. Product Specifications Tab / Accordion section */}
        <div className="mt-16 pt-12 border-t border-[hsl(240_5%_64.9%)/0.1]">
          <h2 className="text-lg font-semibold uppercase tracking-wider mb-6">Product details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
            <div className="p-6 bg-white dark:bg-[hsl(240_6%_15%)] border border-[hsl(240_5%_64.9%)/0.1] rounded-none">
              <h3 className="font-semibold uppercase text-xs tracking-wider mb-3">Specifications</h3>
              <p className="text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                {product.details}
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-[hsl(240_6%_15%)] border border-[hsl(240_5%_64.9%)/0.1] rounded-none">
              <h3 className="font-semibold uppercase text-xs tracking-wider mb-3">Shipping & Returns</h3>
              <p className="text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                Free standard delivery on orders above ৳2500. Standard delivery takes 3-5 business days. 7-day easy return policy applies for all unused items with tagging intact.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
