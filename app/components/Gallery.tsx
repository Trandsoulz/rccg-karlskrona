"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Camera } from 'lucide-react';

// Sample gallery images - replace with your actual images
const galleryImages = [
  {
    src: '/karlskrona.jpg',
    alt: 'Church Community Gathering'
  },
  {
    src: '/general.jpg',
    alt: 'Karlskrona Church Location'
  },
  {
    src: '/pastor-ea-adeboye.jpg',
    alt: 'Pastor E.A. Adeboye'
  },
  {
    src: '/rccg-belief.jpg',
    alt: 'RCCG Beliefs and Values'
  },
  {
    src: '/rccg-priorities.jpg',
    alt: 'RCCG Priorities'
  },
  {
    src: '/rccg-values.jpg',
    alt: 'RCCG Core Values'
  }
];

const Gallery: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    // Trigger animations when component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 bg-[rgb(var(--theme-background))] dark:bg-gray-900">
      <div className="mx-auto max-w-[90rem] px-6">
        {/* Section Header */}
        <div className={`text-center mb-12 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-[rgb(var(--theme-on-surface))] mb-4">
            Our Church Gallery
          </h2>
          <p className="text-[rgb(var(--theme-on-surface)/.6)] text-lg max-w-2xl mx-auto">
            Experience the heart of our community through these glimpses of our faith, fellowship, and worship
          </p>
        </div>

        {/* Bento Grid Gallery */}
        <div className={`grid grid-cols-2 md:grid-cols-4 auto-rows-fr gap-4 min-h-[400px] transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          {/* Large Featured Image - Takes 2x2 on larger screens */}
          <div className="col-span-2 row-span-2 group relative overflow-hidden bg-[rgb(var(--theme-primary)/.05)] hover:bg-[rgb(var(--theme-primary)/.1)] transition-all duration-500 hover:shadow-2xl cursor-pointer min-h-[200px]">
            <Image
              src={galleryImages[0].src}
              alt={galleryImages[0].alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          {/* Regular Images */}
          {galleryImages.slice(1, 5).map((image, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden bg-[rgb(var(--theme-primary)/.05)] hover:bg-[rgb(var(--theme-primary)/.1)] transition-all duration-500 hover:shadow-xl cursor-pointer h-32 md:h-full"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* Bottom Call to Action */}
        <div className={`text-center mt-8 transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <p className="text-[rgb(var(--theme-on-surface)/.6)] text-sm">
            Want to see more of our community in action?{' '}
            <Link 
              href="/gallery" 
              className="text-[rgb(var(--theme-primary))] hover:text-[rgb(var(--theme-accent))] font-medium transition-colors duration-200 cursor-pointer"
            >
              Explore our full gallery →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
