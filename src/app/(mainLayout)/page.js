import Image from "next/image";
import Link from "next/link";
import BannerSection from "@/components/BannerSection";
import { products } from "@/data/products";
import { Star, ArrowRight } from "lucide-react";

export default function Home() {
  // Get 4 featured products for User Story 4.3
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-[hsl(0_0%_98%)] dark:bg-[hsl(240_10%_3.9%)] transition-colors duration-300">
      {/* Dynamic Banner/Hero Section via SwiperJS */}
      <BannerSection />

      {/* Featured Grid Section (User Story 4.3) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(240_3.8%_46.1%)] dark:text-[hsl(240_5%_64.9%)]">
              Curated Selection
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-[hsl(240_10%_3.9%)] dark:text-[hsl(0_0%_98%)] mt-2">
              Featured Collections
            </h2>
          </div>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-[hsl(240_10%_3.9%)] dark:text-[hsl(0_0%_98%)] mt-4 md:mt-0 hover:underline underline-offset-4"
          >
            Explore All Products
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <Link
              href={`/products/${product.id}`}
              key={product.id}
              className="group flex flex-col border border-[hsl(240_5%_64.9%)/0.1] bg-white dark:bg-[hsl(240_6%_15%)] hover:shadow-lg transition-all duration-300 relative"
            >
              {/* Product Image */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 25vw"
                />
                
                {/* Stock status indicator */}
                {!product.inStock && (
                  <div className="absolute top-3 left-3 bg-black/75 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1">
                    Out of Stock
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[hsl(240_3.8%_46.1%)] dark:text-[hsl(240_5%_64.9%)]">
                    {product.category}
                  </span>
                  <h3 className="text-sm font-medium text-[hsl(240_10%_3.9%)] dark:text-[hsl(0_0%_98%)] mt-1 line-clamp-1">
                    {product.name}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-2">
                    <div className="flex text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </div>
                    <span className="text-xs font-semibold text-[hsl(240_10%_3.9%)] dark:text-[hsl(0_0%_98%)]">
                      {product.rating}
                    </span>
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
      </main>
    </div>
  );
}

