'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingBag, Heart } from 'lucide-react';

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Wishlist', href: '/wishlist', icon: Heart },
    { label: 'Cart', href: '/cart', icon: ShoppingBag },
  ];

  const isLinkActive = href => pathname === href;

  return (
    <nav className="w-full bg-[#0E1106] border-b border-[#1C210E] sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-white font-extrabold text-xl tracking-wider select-none font-sans">
                NEXTGEN FASHION
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8 transition-all duration-300">
            {navLinks.slice(0, 2).map(link => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-[15px] font-medium transition-all duration-200 py-2 ${
                    active
                      ? 'text-white font-semibold'
                      : 'text-[#A4A896]/70 hover:text-white'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full transition-all duration-300" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Side: Actions & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            {navLinks.slice(2).map(link => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hidden md:flex items-center p-2 rounded-full text-[#A4A896] hover:text-white hover:bg-[#1C210E] transition-colors"
                  title={link.label}
                >
                  <link.icon
                    className={`h-5 w-5 ${active && 'text-red-400'}`}
                  />
                </Link>
              );
            })}

            {/* Hamburger Button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-[#A4A896] hover:text-white hover:bg-[#1C210E] focus:outline-none transition-all duration-200 cursor-pointer"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? 'max-h-screen opacity-100 border-b border-[#1C210E]'
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}
        id="mobile-menu"
      >
        <div className="px-4 pt-2 pb-6 space-y-4 bg-[#0E1106]/95 backdrop-blur-lg">
          <div className="flex flex-col space-y-2">
            {navLinks.map(link => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                    active
                      ? 'bg-[#1C210E] text-white font-semibold border-l-2 border-[#D4FF00]'
                      : 'text-[#A4A896]/70 hover:text-white hover:bg-[#1C210E]/50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
