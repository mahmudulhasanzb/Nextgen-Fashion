import React from 'react'
import Link from 'next/link'
import { Mail, Phone, ArrowUpRight, Globe } from 'lucide-react'
import {LogoFacebook} from '@gravity-ui/icons';


const Footer = () => {
  return (
    <footer className="border-t border-[hsl(240_5%_64.9%)/0.2] bg-[hsl(30_20%_95%)] dark:bg-[hsl(240_6%_15%)] text-[hsl(240_10%_3.9%)] dark:text-[hsl(0_0%_98%)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold tracking-wider uppercase">NextGen Fashion</h3>
            <p className="text-sm text-[hsl(240_3.8%_46.1%)] dark:text-[hsl(240_5%_64.9%)] max-w-xs">
              Minimal Luxury. Curated apparel for the modern individual.
            </p>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-[hsl(240_3.8%_46.1%)] dark:text-[hsl(240_5%_64.9%)]">
              <li>
                <Link href="/shop" className="hover:text-primary transition-colors inline-flex items-center gap-0.5">
                  All Collections <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Panjabi" className="hover:text-primary transition-colors">
                  Panjabi
                </Link>
              </li>
              <li>
                <Link href="/shop?category=T-Shirts" className="hover:text-primary transition-colors">
                  T-Shirts
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Hoodies" className="hover:text-primary transition-colors">
                  Hoodies
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Info */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-[hsl(240_3.8%_46.1%)] dark:text-[hsl(240_5%_64.9%)]">
              <li>
                <Link href="/faq" className="hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-primary transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase mb-4">Contact</h4>
            <a 
              href="mailto:hello@oxivos.com" 
              className="flex items-center gap-2 text-sm text-[hsl(240_3.8%_46.1%)] dark:text-[hsl(240_5%_64.9%)] hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>hello@nextgen-shop.com</span>
            </a>
            <a 
              href="tel:01756324620" 
              className="flex items-center gap-2 text-sm text-[hsl(240_3.8%_46.1%)] dark:text-[hsl(240_5%_64.9%)] hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>01756324620</span>
            </a>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-12 pt-8 border-t border-[hsl(240_5%_64.9%)/0.1] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[hsl(240_3.8%_46.1%)] dark:text-[hsl(240_5%_64.9%)]">
          <p>© {new Date().getFullYear()} NextGen Fashion. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
             <LogoFacebook />
            </a>
            <a href="https://mahmudulhasan-dev.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <Globe className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
