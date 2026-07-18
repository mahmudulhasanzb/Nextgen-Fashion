'use client';

import React, { useState, useMemo } from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { SlidersHorizontal } from 'lucide-react';

const SORT_OPTIONS = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'rating', label: 'Top Rated' },
];

const ITEMS_PER_PAGE = 8;

const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = activeCategory === 'All' ? products : products.filter((p) => p.category === activeCategory);

    switch (sortBy) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return list;
  }, [activeCategory, sortBy]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleCategory = (cat) => {
    setActiveCategory(cat);
    setPage(1);
  };

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      <div className="container-site">
        {/* Page header */}
        <div className="py-10 border-b" style={{ borderColor: 'var(--color-border)' }}>
          <span className="label-overline">Our Range</span>
          <h1 className="heading-section mt-2">All Products</h1>
          <p className="mt-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
            {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
          </p>
        </div>

        {/* Filters row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-6 border-b" style={{ borderColor: 'var(--color-border)' }}>
          {/* Category pills */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {categories.map((cat) => {
              const isActive = cat === activeCategory;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategory(cat)}
                  aria-pressed={isActive}
                  className="px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer"
                  style={{
                    background: isActive ? 'var(--color-accent)' : 'var(--color-surface)',
                    color: isActive ? 'var(--color-bg)' : 'var(--color-text-muted)',
                    border: `1px solid ${isActive ? 'var(--color-accent)' : 'var(--color-border)'}`,
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={14} style={{ color: 'var(--color-text-faint)' }} />
            <select
              value={sortBy}
              onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
              className="text-[12px] font-medium py-1.5 px-3 pr-8 appearance-none cursor-pointer focus:outline-none"
              style={{
                background: 'var(--color-surface)',
                color: 'var(--color-text-muted)',
                border: '1px solid var(--color-border)',
              }}
              aria-label="Sort products"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Product grid */}
        <div className="py-8">
          {paginated.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {paginated.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <p className="text-lg font-semibold" style={{ color: 'var(--color-text-muted)' }}>
                No products found
              </p>
              <button onClick={() => handleCategory('All')} className="btn-ghost">
                Clear filter
              </button>
            </div>
          )}
        </div>

        {/* Pagination — dots only */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 pb-16" role="navigation" aria-label="Pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                aria-label={`Page ${p}`}
                aria-current={p === page ? 'page' : undefined}
                className="transition-all duration-300 cursor-pointer"
                style={{
                  width: p === page ? '28px' : '8px',
                  height: '8px',
                  borderRadius: '9999px',
                  background: p === page ? 'var(--color-accent)' : 'rgba(164,168,150,0.35)',
                  border: 'none',
                  padding: 0,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
