'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, Loader2, CheckCircle2, ShieldCheck, Tag } from 'lucide-react';
import { products } from '@/data/products';

// Mock initial cart items using products from products.js
const initialCart = [
  {
    id: 1,
    product: products[0], // Classic Cotton Panjabi
    color: 'Navy',
    size: 'L',
    quantity: 1,
  },
  {
    id: 3,
    product: products[2], // Minimalist Oversized Tee
    color: 'Black',
    size: 'XL',
    quantity: 2,
  }
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // Load items
  useEffect(() => {
    // Attempt load from localStorage or fallback to initialCart
    const localCart = localStorage.getItem('nextgen_temp_cart');
    if (localCart) {
      try {
        setCartItems(JSON.parse(localCart));
      } catch (e) {
        setCartItems(initialCart);
      }
    } else {
      setCartItems(initialCart);
    }
  }, []);

  // Save changes
  const saveCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem('nextgen_temp_cart', JSON.stringify(newCart));
  };

  // Adjust quantity (User Story 7.2)
  const updateQuantity = (itemId, delta) => {
    const updated = cartItems.map((item) => {
      if (item.id === itemId) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    });
    saveCart(updated);
  };

  // Remove item (User Story 7.3)
  const removeItem = (itemId) => {
    const updated = cartItems.filter((item) => item.id !== itemId);
    saveCart(updated);
    setConfirmDeleteId(null);
  };

  // Recalculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const vat = Math.round(subtotal * 0.05); // 5% VAT
  const shipping = subtotal > 2500 || subtotal === 0 ? 0 : 120; // Free shipping over 2500
  const finalDiscount = promoApplied ? Math.round(subtotal * 0.1) : 0; // 10% promo discount
  const total = subtotal + vat + shipping - finalDiscount;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'NEXTGEN10') {
      setPromoApplied(true);
      setDiscount(10);
    } else {
      alert('Invalid promo code. Try "NEXTGEN10" for 10% off!');
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate API request (User Story 7.5)
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
      saveCart([]); // Clear cart after successful checkout
    }, 2000);
  };

  if (checkoutSuccess) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[hsl(0_0%_98%)] dark:bg-[hsl(240_10%_3.9%)] text-center px-4">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-950/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold uppercase tracking-wide text-zinc-950 dark:text-zinc-50">Order Placed Successfully!</h2>
        <p className="text-sm text-zinc-500 mt-2 max-w-sm leading-relaxed">
          Thank you for your purchase. We have received your order and are preparing it for shipment.
        </p>
        <Link
          href="/products"
          onClick={() => setCheckoutSuccess(false)}
          className="mt-8 inline-flex items-center gap-2 px-8 py-3 bg-black dark:bg-white text-white dark:text-black text-xs font-semibold uppercase tracking-wider transition-all"
        >
          Continue Shopping
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(0_0%_98%)] dark:bg-[hsl(240_10%_3.9%)] text-[hsl(240_10%_3.9%)] dark:text-[hsl(0_0%_98%)] transition-colors duration-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-[hsl(240_5%_64.9%)/0.1] pb-8 mb-8">
          <h1 className="text-4xl font-bold tracking-tight uppercase">Your Shopping Cart</h1>
          <p className="text-sm text-[hsl(240_3.8%_46.1%)] dark:text-[hsl(240_5%_64.9%)] mt-2">
            Review your selected fashion items and proceed to checkout.
          </p>
        </div>

        {cartItems.length === 0 ? (
          // Empty Cart State (User Story 7.4)
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-[hsl(240_6%_15%)] border border-[hsl(240_5%_64.9%)/0.1] px-4">
            <div className="w-12 h-12 text-zinc-400 dark:text-zinc-600 mb-4">
              <ShoppingBag className="w-full h-full stroke-1" />
            </div>
            <h3 className="text-lg font-medium mb-1">Your cart is currently empty</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">Looks like you haven&apos;t added any products yet.</p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3 bg-black dark:bg-white text-white dark:text-black text-xs font-semibold uppercase tracking-wider transition-all"
            >
              Back to Shop
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-4 p-5 bg-white dark:bg-[hsl(240_6%_15%)] border border-[hsl(240_5%_64.9%)/0.1]"
                >
                  {/* Thumbnail */}
                  <div className="relative w-full sm:w-24 aspect-[3/4] bg-zinc-100 dark:bg-zinc-800 flex-shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover object-center"
                      sizes="96px"
                    />
                  </div>

                  {/* Item Description */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">
                            {item.product.category}
                          </span>
                          <h3 className="text-sm font-medium uppercase mt-0.5 line-clamp-1">
                            <Link href={`/products/${item.product.id}`} className="hover:underline">
                              {item.product.name}
                            </Link>
                          </h3>
                        </div>
                        <span className="text-sm font-bold text-zinc-950 dark:text-zinc-50">
                          ৳{item.product.price}
                        </span>
                      </div>

                      {/* Config details */}
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500 mt-2">
                        <div>
                          <span className="font-medium text-zinc-400">Color:</span> {item.color}
                        </div>
                        <div>
                          <span className="font-medium text-zinc-400">Size:</span> {item.size}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-end mt-6">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-[hsl(240_5%_64.9%)/0.2] bg-zinc-50 dark:bg-zinc-850">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2.5 py-1 text-zinc-500 hover:text-black dark:hover:text-white"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-semibold select-none">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2.5 py-1 text-zinc-500 hover:text-black dark:hover:text-white"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Delete / Remove Action */}
                      <div className="relative">
                        {confirmDeleteId === item.id ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-xs bg-red-600 text-white font-semibold uppercase tracking-wider px-2.5 py-1 hover:bg-red-700 transition-all"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setConfirmDeleteId(null)}
                              className="text-xs bg-zinc-200 dark:bg-zinc-800 font-semibold uppercase tracking-wider px-2.5 py-1 transition-all"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmDeleteId(item.id)}
                            className="text-zinc-400 hover:text-red-500 p-1 transition-colors"
                            aria-label="Delete item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Panel */}
            <div className="lg:col-span-4 p-6 bg-white dark:bg-[hsl(240_6%_15%)] border border-[hsl(240_5%_64.9%)/0.1] space-y-6">
              <h2 className="text-base font-semibold uppercase tracking-wider pb-3 border-b border-[hsl(240_5%_64.9%)/0.1]">
                Order Summary
              </h2>

              {/* Price Breakdown */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Subtotal</span>
                  <span>৳{subtotal}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-green-600 dark:text-green-400">
                    <span>Discount (10% Code)</span>
                    <span>-৳{finalDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-zinc-500">Estimated VAT (5%)</span>
                  <span>৳{vat}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `৳${shipping}`}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-[10px] text-zinc-400 text-right">
                    Spend ৳{2500 - subtotal} more for free shipping
                  </p>
                )}
                <div className="flex justify-between font-bold text-base pt-3 border-t border-[hsl(240_5%_64.9%)/0.1]">
                  <span>Total</span>
                  <span className="text-[hsl(142_70%_29%)] dark:text-[hsl(142_76%_36%)]">৳{total}</span>
                </div>
              </div>

              {/* Promo Code Box */}
              <form onSubmit={handleApplyPromo} className="pt-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
                    <input
                      type="text"
                      placeholder="Promo Code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-800 border border-[hsl(240_5%_64.9%)/0.2] focus:outline-none focus:border-black dark:focus:border-white rounded-none disabled:opacity-50"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={promoApplied}
                    className="px-4 py-2 border border-black dark:border-white text-xs font-semibold uppercase tracking-wider hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all disabled:opacity-50"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-[10px] text-green-600 dark:text-green-400 mt-2 font-medium">
                    Code NEXTGEN10 applied successfully!
                  </p>
                )}
              </form>

              {/* Guarantee badge */}
              <div className="flex items-start gap-3 p-3 bg-zinc-50 dark:bg-zinc-800/40 text-[11px] text-zinc-500 border border-[hsl(240_5%_64.9%)/0.05]">
                <ShieldCheck className="w-4 h-4 text-zinc-400 flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed font-light">
                  Secure checkout guaranteed. 100% genuine fashion products with simplified return window options.
                </p>
              </div>

              {/* Checkout Action */}
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-100 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
              >
                {isCheckingOut ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing Order...
                  </>
                ) : (
                  <>
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
