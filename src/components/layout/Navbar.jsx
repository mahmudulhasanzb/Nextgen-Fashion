'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart, Sun, Moon, Menu, X, User } from 'lucide-react';

const Navbar = () => {
  const [theme, setTheme] = useState('light');
  const [isOpen, setIsOpen] = useState(false);

  // Placeholders/Fallback for cart & wishlist counts (until Contexts are created)
  const cartCount = 3;
  const wishlistCount = 2;

  useEffect(() => {
    // Sync with HTML class
    const root = window.document.documentElement;
    const initialTheme = root.classList.contains('dark') ? 'dark' : 'light';
    setTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('dark');
      setTheme('dark');
    } else {
      root.classList.remove('dark');
      setTheme('light');
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[hsl(240_5%_64.9%)/0.1] bg-[hsl(0_0%_98%)/0.75] dark:bg-[hsl(240_10%_3.9%)/0.75] backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-xl font-bold tracking-wider uppercase text-[hsl(240_10%_3.9%)] dark:text-[hsl(0_0%_98%)]"
            >
              NextGen Fashion
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-8 text-sm font-medium text-[hsl(240_3.8%_46.1%)] dark:text-[hsl(240_5%_64.9%)]">
            <Link
              href="/"
              className="hover:text-[hsl(240_10%_3.9%)] dark:hover:text-[hsl(0_0%_98%)] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="hover:text-[hsl(240_10%_3.9%)] dark:hover:text-[hsl(0_0%_98%)] transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/products?category=Panjabi"
              className="hover:text-[hsl(240_10%_3.9%)] dark:hover:text-[hsl(0_0%_98%)] transition-colors"
            >
              Panjabi
            </Link>
            <Link
              href="/products?category=T-Shirts"
              className="hover:text-[hsl(240_10%_3.9%)] dark:hover:text-[hsl(0_0%_98%)] transition-colors"
            >
              T-Shirts
            </Link>
          </div>

          {/* Right Action Icons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-[hsl(240_5%_64.9%)/0.1] text-[hsl(240_10%_3.9%)] dark:text-[hsl(0_0%_98%)] transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Wishlist Button */}
            <Link
              href="/wishlist"
              className="p-2 rounded-full hover:bg-[hsl(240_5%_64.9%)/0.1] text-[hsl(240_10%_3.9%)] dark:text-[hsl(0_0%_98%)] relative transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-red-500 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <Link
              href="/cart"
              className="p-2 rounded-full hover:bg-[hsl(240_5%_64.9%)/0.1] text-[hsl(240_10%_3.9%)] dark:text-[hsl(0_0%_98%)] relative transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-green-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Demo Login Button */}
            <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider border border-[hsl(240_10%_3.9%)] dark:border-[hsl(0_0%_98%)] rounded-none hover:bg-[hsl(240_10%_3.9%)] hover:text-white dark:hover:bg-[hsl(0_0%_98%)] dark:hover:text-black transition-all">
              <User className="w-4 h-4" />
              Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-[hsl(240_10%_3.9%)] dark:text-[hsl(0_0%_98%)]"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-[hsl(240_10%_3.9%)] dark:text-[hsl(0_0%_98%)] focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-[hsl(240_5%_64.9%)/0.1] bg-[hsl(0_0%_98%)] dark:bg-[hsl(240_10%_3.9%)] transition-colors duration-300">
          <div className="px-2 pt-2 pb-4 space-y-1">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-[hsl(240_3.8%_46.1%)] dark:text-[hsl(240_5%_64.9%)] hover:bg-[hsl(240_5%_64.9%)/0.1]"
            >
              Home
            </Link>
            <Link
              href="/products"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-[hsl(240_3.8%_46.1%)] dark:text-[hsl(240_5%_64.9%)] hover:bg-[hsl(240_5%_64.9%)/0.1]"
            >
              Shop
            </Link>
            <Link
              href="/wishlist"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-[hsl(240_3.8%_46.1%)] dark:text-[hsl(240_5%_64.9%)] hover:bg-[hsl(240_5%_64.9%)/0.1]"
            >
              Wishlist ({wishlistCount})
            </Link>
            <Link
              href="/cart"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-[hsl(240_3.8%_46.1%)] dark:text-[hsl(240_5%_64.9%)] hover:bg-[hsl(240_5%_64.9%)/0.1]"
            >
              Cart ({cartCount})
            </Link>
            <div className="px-3 pt-4">
              <button className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold uppercase tracking-wider border border-[hsl(240_10%_3.9%)] dark:border-[hsl(0_0%_98%)] rounded-none hover:bg-[hsl(240_10%_3.9%)] hover:text-white dark:hover:bg-[hsl(0_0%_98%)] dark:hover:text-black transition-all">
                <User className="w-4 h-4" />
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
