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
      <Navbar/>
      <main className="min-h-[80vh] bg-[#0A0D02] flex flex-col items-center justify-center text-center px-6 py-24 relative overflow-hidden z-10">
        <div className="flex flex-col items-center text-center max-w-lg mx-auto">
          <p className="text-[8rem] sm:text-[10rem] font-black leading-none tracking-tighter text-zinc-100 dark:text-zinc-800 select-none">
            404
          </p>

          <div className="-mt-8 sm:-mt-12 space-y-4">
            <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-zinc-900 dark:text-zinc-50">
              Page Not Found
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-sm mx-auto">
              Looks like this page went out of stock. It may have been moved,
              deleted, or never existed.
            </p>
          </div>

          <div className="w-16 h-px bg-zinc-200 dark:bg-zinc-800 my-8" />

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center h-11 px-7 bg-white text-black text-sm font-medium rounded-lg transition hover:opacity-90"
            >
              Return Home
            </Link>

            <Link
              href="/products"
              className="inline-flex items-center justify-center h-11 px-7 text-white text-sm font-medium rounded-lg border border-white/10 transition hover:border-white/30"
            >
              Shop Collection
            </Link>
          </div>
        </div>
      </main>
      <Footer/>
    </>
  );
}
