"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchGallery } from '@/app/sanity/queries';
import { Gallery as GalleryType } from '@/types/gallery';

// Skeleton component for loading state
const GallerySkeleton: React.FC = () => {
  return (
    <section className="py-16 bg-[rgb(var(--theme-background))] dark:bg-gray-900">
      <div className="mx-auto max-w-[100rem] px-6">
        {/* Section Header Skeleton */}
        <div className="text-center mb-12">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-80 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-96 mx-auto animate-pulse"></div>
        </div>

        {/* Bento Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-fr gap-4 min-h-[400px]">
          {/* Large Featured Skeleton - Takes 2x2 on larger screens */}
          <div className="col-span-2 row-span-2 bg-gray-200 dark:bg-gray-700 animate-pulse min-h-[200px]"></div>

          {/* Regular Image Skeletons */}
          {[...Array(4)].map((_, index) => (
            <div 
              key={index}
              className="bg-gray-200 dark:bg-gray-700 animate-pulse h-32 md:h-full"
            ></div>
          ))}
        </div>

        {/* Bottom CTA Skeleton */}
        <div className="text-center mt-8">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-64 mx-auto animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

const Gallery: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [galleryImages, setGalleryImages] = useState<GalleryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Trigger animations when component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const loadGalleryImages = async () => {
      try {
        setLoading(true);
        const images = await fetchGallery();
        // Cap at 5 images for the homepage gallery
        setGalleryImages(images.slice(0, 5));
      } catch (err) {
        console.error('Error loading gallery images:', err);
        setError('Failed to load gallery images');
      } finally {
        setLoading(false);
      }
    };

    loadGalleryImages();
  }, []);

  // Show skeleton while loading
  if (loading) {
    return <GallerySkeleton />;
  }

  // Show message if no images or error
  if (error || galleryImages.length === 0) {
    return (
      <section className="py-16 bg-[rgb(var(--theme-background))] dark:bg-gray-900">
        <div className="mx-auto max-w-[100rem] px-6">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[rgb(var(--theme-on-surface))] mb-4">
              Our Church Gallery
            </h2>
            <p className="text-[rgb(var(--theme-on-surface)/.6)] text-lg">
              {error || 'No gallery images available at the moment. Please check back later.'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-[rgb(var(--theme-background))] dark:bg-gray-900">
      <div className="mx-auto max-w-[100rem] px-6">
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
            priority
              src={galleryImages[0].image}
              alt={galleryImages[0].name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          {/* Regular Images */}
          {galleryImages.slice(1).map((image) => (
            <div 
              key={image.id}
              className="group relative overflow-hidden bg-[rgb(var(--theme-primary)/.05)] hover:bg-[rgb(var(--theme-primary)/.1)] transition-all duration-500 hover:shadow-xl cursor-pointer h-32 md:h-full"
            >
              <Image
                src={image.image}
                alt={image.name}
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
