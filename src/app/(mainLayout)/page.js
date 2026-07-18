import Link from 'next/link';
import BannerSection from '@/components/BannerSection';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'NextGen Fashion — Premium Modern Clothing',
  description:
    'Discover our curated collection of premium fashion pieces. Traditional elegance meets modern streetwear.',
};

export default function Home() {
  const featuredProducts = products.slice(0, 8);

  return (
    <div style={{ background: 'var(--color-bg)' }}>
      {/* Banner component */}
      <BannerSection />

      {/* Featured Collections */}
      <section className="section-gap" aria-labelledby="featured-heading">
        <div className="container-site">
          {/*header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div className="space-y-2">
              <span className="label-overline">Curated For You</span>
              <h2 id="featured-heading" className="heading-section">
                Featured Collections
              </h2>
            </div>
            <Link
              href="/products"
              className="btn-ghost self-start sm:self-auto"
            >
              All Products
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex justify-center mt-12">
            <Link href="/products" className="btn-accent">
              Explore All Products
              <ArrowRight size={15} />
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
