'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQty, clearCart, subtotal, totalItems } = useCart();
  const total = subtotal;

  const handleRemove = (id, name) => {
    removeFromCart(id);
    toast(`${name} removed from cart`, { icon: '🗑️' });
  };

  if (cartItems.length === 0) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-6 text-center"
        style={{ background: 'var(--color-bg)' }}
      >
        <div
          className="w-20 h-20 flex items-center justify-center rounded-full"
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
          }}
        >
          <ShoppingBag
            size={32}
            style={{ color: 'var(--color-text-faint)' }}
            strokeWidth={1}
          />
        </div>
        <div className="space-y-2">
          <h1 className="heading-section">Your cart is empty</h1>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Add some items to get started.
          </p>
        </div>
        <Link href="/products" className="btn-accent">
          <ArrowLeft size={15} />
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      <div className="container-site py-10 md:py-14">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <span className="label-overline">Checkout</span>
            <h1 className="heading-section">
              Shopping Cart
              <span
                className="ml-3 text-base font-semibold"
                style={{ color: 'var(--color-text-muted)' }}
              >
                ({totalItems} {totalItems === 1 ? 'item' : 'items'})
              </span>
            </h1>
          </div>
          <button
            onClick={() => {
              clearCart();
              toast('Cart cleared');
            }}
            className="text-xs font-semibold uppercase tracking-wider transition-colors duration-150 cursor-pointer"
            style={{ color: 'var(--color-text-faint)' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#ef4444')}
            onMouseLeave={e =>
              (e.currentTarget.style.color = 'var(--color-text-faint)')
            }
          >
            Clear all
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          {/*Cart items*/}
          <div className="space-y-3">
            {cartItems.map(item => (
              <div
                key={item.id}
                className="flex gap-4 p-4"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                }}
              >
                {/* Image */}
                <Link href={`/products/${item.id}`} className="flex-shrink-0">
                  <div
                    className="relative overflow-hidden"
                    style={{
                      width: '80px',
                      height: '100px',
                      background: '#0E1106',
                    }}
                  >
                    {item.images?.[0] && (
                      <Image
                        src={item.images[0]}
                        alt={item.name}
                        fill
                        className="object-cover object-top"
                        sizes="80px"
                      />
                    )}
                  </div>
                </Link>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <Link
                      href={`/products/${item.id}`}
                      className="font-semibold text-sm leading-snug hover:text-[var(--color-accent)] transition-colors"
                    >
                      {item.name}
                    </Link>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Qty stepper */}
                    <div
                      className="flex items-center"
                      style={{ border: '1px solid var(--color-border)' }}
                    >
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="w-8 h-8 flex items-center justify-center text-base font-medium transition-colors hover:text-white cursor-pointer"
                        style={{
                          color: 'var(--color-text-muted)',
                          borderRight: '1px solid var(--color-border)',
                          background: 'transparent',
                        }}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-10 h-8 flex items-center justify-center text-sm font-bold text-white">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="w-8 h-8 flex items-center justify-center text-base font-medium transition-colors hover:text-white cursor-pointer"
                        style={{
                          color: 'var(--color-text-muted)',
                          borderLeft: '1px solid var(--color-border)',
                          background: 'transparent',
                        }}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Line total + remove */}
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-white">
                        ৳ {item.price * item.qty}
                      </span>
                      <button
                        onClick={() => handleRemove(item.id, item.name)}
                        className="p-1.5 transition-colors duration-150 cursor-pointer hover:text-red-500"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue shopping */}
            <Link
              href="/products"
              className="inline-flex items-center gap-2 mt-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-150 hover:text-[var(--color-accent)]"
              style={{ color: 'var(--color-text-muted)' }}
            >
              <ArrowLeft size={13} />
              Continue Shopping
            </Link>
          </div>

          {/* Order summary sidebar */}
          <div className="h-fit" style={{ position: 'sticky', top: '6rem' }}>
            <div
              className="p-6 space-y-5"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              <h2
                className="text-sm font-bold uppercase tracking-widest"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Order Summary
              </h2>

              {/* Line items */}
              <div
                className="space-y-3 pt-1"
                style={{ borderTop: '1px solid var(--color-border)' }}
              >
                <div className="flex justify-between text-sm pt-3">
                  <span style={{ color: 'var(--color-text-muted)' }}>
                    Subtotal
                  </span>
                  <span className="font-semibold text-white">{subtotal}</span>
                </div>
              </div>

              {/* Total */}
              <div
                className="flex justify-between items-center pt-4"
                style={{ borderTop: '1px solid var(--color-border)' }}
              >
                <span className="text-sm font-bold uppercase tracking-wider text-white">
                  Total
                </span>
                <span className="text-xl font-black text-white">{total}</span>
              </div>

              {/* Checkout CTA */}
              <button className="btn-accent w-full mt-2">
                Proceed to Checkout
                <ArrowRight size={15} />
              </button>

              <p
                className="text-center text-[11px]"
                style={{ color: 'var(--color-text-faint)' }}
              >
                Secure checkout. Taxes calculated at next step.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
