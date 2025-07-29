'use client'

import Navigation from "@/app/components/Navigation";
import React from "react";
import Image from "next/image";
import { Camera, ArrowLeft } from "lucide-react";
import Link from "next/link";

// Extended gallery with more images for the full gallery page
const fullGalleryImages = [
  {
    id: 1,
    src: '/general.jpg',
    alt: 'Church Community Gathering',
    title: 'Community Gathering',
    category: 'Events'
  },
  {
    id: 2,
    src: '/karlskrona.jpg',
    alt: 'Karlskrona Church Location',
    title: 'Karlskrona Location',
    category: 'Locations'
  },
  {
    id: 3,
    src: '/pastor-ea-adeboye.jpg',
    alt: 'Pastor E.A. Adeboye',
    title: 'Pastor E.A. Adeboye',
    category: 'Leadership'
  },
  {
    id: 4,
    src: '/rccg-belief.jpg',
    alt: 'RCCG Beliefs and Values',
    title: 'Our Beliefs',
    category: 'Values'
  },
  {
    id: 5,
    src: '/rccg-priorities.jpg',
    alt: 'RCCG Priorities',
    title: 'Our Priorities',
    category: 'Values'
  },
  {
    id: 6,
    src: '/rccg-values.jpg',
    alt: 'RCCG Core Values',
    title: 'Our Values',
    category: 'Values'
  },
  // Add more images as needed
  {
    id: 7,
    src: '/general.jpg',
    alt: 'Sunday Service',
    title: 'Sunday Worship',
    category: 'Worship'
  },
  {
    id: 8,
    src: '/karlskrona.jpg',
    alt: 'Youth Ministry',
    title: 'Youth Fellowship',
    category: 'Ministry'
  },
];

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const categories = ['All', ...Array.from(new Set(fullGalleryImages.map(img => img.category)))];
  
  const filteredImages = selectedCategory === 'All' 
    ? fullGalleryImages 
    : fullGalleryImages.filter(img => img.category === selectedCategory);

  return (
    <main>
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Header */}
      <section className="py-20 bg-gradient-to-br from-[rgb(var(--theme-background))] to-[rgb(var(--theme-primary)/.05)] dark:from-gray-900 dark:to-gray-800">
        <div className="mx-auto max-w-[90rem] px-6">
          <div className={`text-center transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            {/* Back Button */}
            <div className="mb-8">
              <Link 
                href="/" 
                className="inline-flex items-center text-[rgb(var(--theme-primary))] hover:text-[rgb(var(--theme-accent))] transition-colors duration-200 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </div>

            {/* Header Content */}
            <div className="flex items-center justify-center mb-6">
              <Camera className="w-8 h-8 text-[rgb(var(--theme-primary))] mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold text-[rgb(var(--theme-on-surface))]">
                Church Gallery
              </h1>
            </div>
            
            <p className="text-[rgb(var(--theme-on-surface)/.6)] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Explore our vibrant church community through these photos capturing our worship, fellowship, 
              events, and the heart of our faith journey together in Sweden.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-16 bg-[rgb(var(--theme-background))] dark:bg-gray-900">
        <div className="mx-auto max-w-[90rem] px-6">
          {/* Category Filter */}
          <div className={`mb-12 transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                    selectedCategory === category
                      ? 'bg-[rgb(var(--theme-primary))] text-white shadow-lg'
                      : 'bg-[rgb(var(--theme-primary)/.1)] text-[rgb(var(--theme-primary))] hover:bg-[rgb(var(--theme-primary)/.2)]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            {filteredImages.map((image, index) => (
              <div 
                key={image.id}
                className="group relative overflow-hidden bg-[rgb(var(--theme-background))] dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-[rgb(var(--theme-primary))] text-white text-xs font-medium">
                      {image.category}
                    </span>
                  </div>
                  
                  {/* Image Info Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-lg font-bold mb-1 drop-shadow-lg">
                      {image.title}
                    </h3>
                    <p className="text-white/90 text-sm drop-shadow-md">
                      {image.category}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button (if you want to implement pagination later) */}
          <div className="text-center mt-12">
            <p className="text-[rgb(var(--theme-on-surface)/.6)] text-sm">
              Showing {filteredImages.length} photos
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default GalleryPage;
