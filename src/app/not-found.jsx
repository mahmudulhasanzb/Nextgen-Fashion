import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Home, ShoppingBag } from 'lucide-react';

export const metadata = {
  title: '404 — Page Not Found | NextGen Fashion',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] flex items-center justify-center bg-[hsl(0_0%_98%)] dark:bg-[hsl(240_10%_3.9%)] px-4 py-24 transition-colors duration-300">
        <div className="flex flex-col items-center text-center max-w-lg mx-auto">

          {/* Large 404 text */}
          <p className="text-[8rem] sm:text-[10rem] font-black leading-none tracking-tighter text-zinc-100 dark:text-zinc-800 select-none">
            404
          </p>

          {/* Layered content on top */}
          <div className="-mt-8 sm:-mt-12 space-y-4">
            <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-zinc-900 dark:text-zinc-50">
              Page Not Found
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-sm mx-auto">
              Looks like this page went out of stock. It may have been moved, deleted, or never existed.
            </p>
          </div>

          {/* Divider */}
          <div className="w-16 h-px bg-zinc-200 dark:bg-zinc-800 my-8" />

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black text-xs font-semibold uppercase tracking-wider hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-black dark:border-white text-black dark:text-white text-xs font-semibold uppercase tracking-wider hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              Explore Products
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
