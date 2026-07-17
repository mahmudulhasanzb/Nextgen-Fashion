'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { products } from '@/data/products';
import { Search, SlidersHorizontal, Star, ArrowUpDown, X, Loader2 } from 'lucide-react';

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [isLoading, setIsLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Extract categories dynamically from products data
  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

  // Sync state with URL search params on load
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');
    const sortParam = searchParams.get('sort');

    if (categoryParam) setSelectedCategory(categoryParam);
    if (searchParam) setSearchTerm(searchParam);
    if (sortParam) setSortBy(sortParam);
  }, [searchParams]);

  // Handle filter, search, and sort logic with mock loading (800ms)
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      let result = [...products];

      // 1. Category Filter
      if (selectedCategory !== 'All') {
        result = result.filter(
          (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
        );
      }

      // 2. Search Filter
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        result = result.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query)
        );
      }

      // 3. Sorting
      if (sortBy === 'price-low') {
        result.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'price-high') {
        result.sort((a, b) => b.price - a.price);
      } else if (sortBy === 'rating') {
        result.sort((a, b) => b.rating - a.rating);
      }

      setFilteredProducts(result);
      setIsLoading(false);
    }, 600); // 600ms mock delay for clean skeleton loading feel

    return () => clearTimeout(timer);
  }, [selectedCategory, searchTerm, sortBy]);

  // Update URL search parameters
  const updateParams = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'All' && value !== 'featured' && value !== '') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/products?${params.toString()}`);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    updateParams('category', category);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    updateParams('search', val);
  };

  const handleSortChange = (e) => {
    const val = e.target.value;
    setSortBy(val);
    updateParams('sort', val);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSortBy('featured');
    router.push('/products');
  };

  return (
    <div className="min-h-screen bg-[hsl(0_0%_98%)] dark:bg-[hsl(240_10%_3.9%)] text-[hsl(240_10%_3.9%)] dark:text-[hsl(0_0%_98%)] transition-colors duration-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-[hsl(240_5%_64.9%)/0.1] pb-8 mb-8">
          <h1 className="text-4xl font-bold tracking-tight uppercase">Catalog</h1>
          <p className="text-sm text-[hsl(240_3.8%_46.1%)] dark:text-[hsl(240_5%_64.9%)] mt-2">
            Explore our curated range of minimal luxury fashion and streetwear.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-8 pb-6 border-b border-[hsl(240_5%_64.9%)/0.1]">
          {/* Search Input */}
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-[hsl(240_6%_15%)] border border-[hsl(240_5%_64.9%)/0.2] focus:outline-none focus:border-black dark:focus:border-white transition-all rounded-none"
            />
            {searchTerm && (
              <button 
                onClick={() => { setSearchTerm(''); updateParams('search', ''); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex w-full lg:w-auto items-center justify-between sm:justify-end gap-4">
            <div className="flex items-center gap-2 text-sm text-[hsl(240_3.8%_46.1%)] dark:text-[hsl(240_5%_64.9%)]">
              <ArrowUpDown className="w-4 h-4" />
              <span>Sort by:</span>
            </div>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="px-3 py-2 text-sm bg-white dark:bg-[hsl(240_6%_15%)] border border-[hsl(240_5%_64.9%)/0.2] focus:outline-none focus:border-black dark:focus:border-white rounded-none cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Sidebar Category Filters (Desktop) */}
          <div className="hidden lg:block space-y-6">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                Categories
              </h3>
              <div className="flex flex-col gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`text-left px-3 py-2 text-sm transition-all duration-200 border-l-2 ${
                      selectedCategory === cat
                        ? 'border-black dark:border-white font-semibold bg-zinc-100 dark:bg-zinc-800/50'
                        : 'border-transparent text-[hsl(240_3.8%_46.1%)] dark:text-[hsl(240_5%_64.9%)] hover:text-black dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900/30'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {(selectedCategory !== 'All' || searchTerm !== '' || sortBy !== 'featured') && (
              <button
                onClick={clearAllFilters}
                className="w-full py-2 border border-dashed border-red-500/50 text-red-500 hover:bg-red-50/50 dark:hover:bg-red-950/20 text-xs font-semibold uppercase tracking-wider transition-all"
              >
                Clear All Filters
              </button>
            )}
          </div>

          {/* Mobile Category Horizontal Row */}
          <div className="lg:hidden w-full overflow-x-auto pb-4 flex gap-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`whitespace-nowrap px-4 py-2 text-xs font-semibold uppercase tracking-wider border transition-all ${
                  selectedCategory === cat
                    ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white'
                    : 'bg-white dark:bg-[hsl(240_6%_15%)] text-[hsl(240_3.8%_46.1%)] dark:text-[hsl(240_5%_64.9%)] border-[hsl(240_5%_64.9%)/0.2]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Products Grid Area */}
          <div className="lg:col-span-3">
            {isLoading ? (
              // Loader Skeletons (User Story 5.5)
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex flex-col border border-[hsl(240_5%_64.9%)/0.1] bg-white dark:bg-[hsl(240_6%_15%)] animate-pulse">
                    <div className="aspect-[3/4] w-full bg-zinc-200 dark:bg-zinc-800" />
                    <div className="p-5 space-y-3">
                      <div className="h-3 w-1/3 bg-zinc-200 dark:bg-zinc-800" />
                      <div className="h-4 w-3/4 bg-zinc-200 dark:bg-zinc-800" />
                      <div className="h-3 w-1/4 bg-zinc-200 dark:bg-zinc-800" />
                      <div className="border-t border-zinc-100 dark:border-zinc-800 pt-4 mt-2 flex justify-between">
                        <div className="h-4 w-1/4 bg-zinc-200 dark:bg-zinc-800" />
                        <div className="h-4 w-1/4 bg-zinc-200 dark:bg-zinc-800" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <Link
                    href={`/products/${product.id}`}
                    key={product.id}
                    className="group flex flex-col border border-[hsl(240_5%_64.9%)/0.1] bg-white dark:bg-[hsl(240_6%_15%)] hover:shadow-lg transition-all duration-300 relative"
                  >
                    {/* Image */}
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                      />
                      {!product.inStock && (
                        <div className="absolute top-3 left-3 bg-black/75 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1">
                          Out of Stock
                        </div>
                      )}
                    </div>

                    {/* Meta/Info */}
                    <div className="p-5 flex flex-col flex-1 justify-between">
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-[hsl(240_3.8%_46.1%)] dark:text-[hsl(240_5%_64.9%)]">
                          {product.category}
                        </span>
                        <h3 className="text-sm font-medium text-[hsl(240_10%_3.9%)] dark:text-[hsl(0_0%_98%)] mt-1 line-clamp-1">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-1 mt-2">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-xs font-semibold">{product.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-[hsl(240_5%_64.9%)/0.1]">
                        <span className="text-sm font-semibold text-[hsl(142_70%_29%)] dark:text-[hsl(142_76%_36%)]">
                          ৳{product.price}
                        </span>
                        <span className="text-xs font-medium uppercase tracking-wider text-[hsl(240_10%_3.9%)] dark:text-[hsl(0_0%_98%)] group-hover:underline">
                          View Details
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              // Empty State
              <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-[hsl(240_5%_64.9%)/0.2] bg-white dark:bg-[hsl(240_6%_15%)]">
                <p className="text-zinc-500 dark:text-zinc-400 mb-4">No products found matching your criteria.</p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[hsl(0_0%_98%)] dark:bg-[hsl(240_10%_3.9%)]">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
