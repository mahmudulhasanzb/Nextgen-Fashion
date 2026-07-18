'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const slides = [
  {
    id: 1,
    title: 'Traditional Elegance Redefined',
    subtitle: 'The Panjabi Collection',
    description: 'Experience premium comfort with our handcrafted cotton Panjabis featuring collar embroidery and modern slim cuts.',
    image: 'https://images.unsplash.com/photo-1608748010899-18f300247112?w=1600&auto=format&fit=crop&q=80',
    link: '/products?category=Panjabi',
    cta: 'Shop Collection',
  },
  {
    id: 2,
    title: 'Modern Streetwear Aesthetics',
    subtitle: 'The Essentials',
    description: 'Explore loose fits, heavyweight textures, and minimal graphic hoodies designed for the modern urban lifestyle.',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1600&auto=format&fit=crop&q=80',
    link: '/products',
    cta: 'Explore Streetwear',
  },
  {
    id: 3,
    title: 'Premium Outerwear & Jackets',
    subtitle: 'Winter Editorial',
    description: 'Indulge in structured wool trench coats, heavy denim jackets, and varsity outerwear that defines bold style.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&auto=format&fit=crop&q=80',
    link: '/products?category=Jackets',
    cta: 'View Jackets',
  },
];

export default function BannerSection() {
  return (
    <section
      aria-label="Featured collections banner"
      className="relative w-full overflow-hidden"
      style={{ height: 'clamp(480px, 82vh, 760px)' }}
    >
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
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
                className="object-cover object-center"
                sizes="100vw"
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to right, rgba(14,17,6,0.85) 0%, rgba(14,17,6,0.55) 50%, rgba(14,17,6,0.1) 100%)',
                }}
              />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center z-10">
              <div className="container-site w-full">
                <div className="max-w-xl space-y-5">
                  <span className="label-overline">{slide.subtitle}</span>

                  <h1
                    className="font-black leading-none tracking-tight text-white"
                    style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4rem)' }}
                  >
                    {slide.title}
                  </h1>

                  <p
                    className="leading-relaxed font-light"
                    style={{ color: 'var(--color-text-muted)', fontSize: '1.0625rem', maxWidth: '36rem' }}
                  >
                    {slide.description}
                  </p>

                  <div className="pt-2">
                    <Link href={slide.link} className="btn-accent">
                      {slide.cta}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination */}
      <div
        className="swiper-pagination"
        style={{ position: 'absolute', bottom: '2rem', width: '100%', zIndex: 20, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      />
    </section>
  );
}
