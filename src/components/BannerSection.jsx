'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const slides = [
  {
    id: 1,
    title: 'Traditional Elegance Redefined',
    subtitle: 'THE PANJABI COLLECTION',
    description: 'Experience premium comfort with our handcrafted cotton Panjabis featuring collar embroidery and modern slim cuts.',
    image: 'https://images.unsplash.com/photo-1608748010899-18f300247112?w=1600&auto=format&fit=crop&q=80',
    link: '/shop?category=Panjabi',
    cta: 'Shop Collection'
  },
  {
    id: 2,
    title: 'Modern Streetwear Aesthetics',
    subtitle: 'THE ESSENTIALS',
    description: 'Explore loose fits, heavyweight textures, and minimal graphic hoodies designed for modern urban lifestyle.',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1600&auto=format&fit=crop&q=80',
    link: '/shop',
    cta: 'Explore Streetwear'
  },
  {
    id: 3,
    title: 'Premium Outerwear & Jackets',
    subtitle: 'WINTER EDITORIAL',
    description: 'Indulge in structured wool trench coats, heavy denim jackets, and varsity outerwear that defines style.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&auto=format&fit=crop&q=80',
    link: '/shop?category=Jackets',
    cta: 'View Jackets'
  }
];

export default function BannerSection() {
  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] bg-zinc-100 dark:bg-zinc-950 overflow-hidden group">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
          el: '.custom-swiper-pagination',
          bulletClass: 'w-2 h-2 mx-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 transition-all duration-300 inline-block cursor-pointer',
          bulletActiveClass: '!w-8 !bg-zinc-900 dark:!bg-zinc-50',
        }}
        navigation={{
          nextEl: '.custom-swiper-button-next',
          prevEl: '.custom-swiper-button-prev',
        }}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative h-full w-full select-none">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={slide.id === 1}
                className="object-cover object-center transform scale-105 transition-transform duration-[5000ms] ease-out"
                sizes="100vw"
              />
              {/* Overlay with subtle gradient for optimal reading */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent dark:from-black/80 dark:via-black/50 dark:to-transparent" />
            </div>

            {/* Content Area */}
            <div className="absolute inset-0 flex items-center justify-start px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
              <div className="max-w-2xl text-left text-white space-y-4 md:space-y-6">
                <span className="inline-block text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-zinc-300 dark:text-zinc-400">
                  {slide.subtitle}
                </span>
                
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-none text-white transition-all duration-700">
                  {slide.title}
                </h1>
                
                <p className="text-sm sm:text-lg text-zinc-200 dark:text-zinc-300 font-light max-w-lg leading-relaxed">
                  {slide.description}
                </p>

                <div className="pt-2 md:pt-4">
                  <Link
                    href={slide.link}
                    className="inline-flex items-center justify-center px-6 py-3 border border-white text-sm font-medium uppercase tracking-wider text-white hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
                  >
                    {slide.cta}
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <button className="custom-swiper-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 border border-white/20 bg-black/10 text-white backdrop-blur-sm rounded-none hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-pointer opacity-0 group-hover:opacity-100">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button className="custom-swiper-button-next absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 border border-white/20 bg-black/10 text-white backdrop-blur-sm rounded-none hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-pointer opacity-0 group-hover:opacity-100">
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Pagination dots container */}
      <div className="custom-swiper-pagination absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center" />
    </div>
  );
}
