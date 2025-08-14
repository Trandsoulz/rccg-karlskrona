"use client";

import Navigation from "@/app/components/Navigation";
import React, { useState, useEffect } from "react";
import { Camera, ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { fetchGallery } from "@/app/sanity/queries";
import { Gallery as GalleryType } from "@/types/gallery";
import Masonry from "react-masonry-css";
import Image from "next/image";

// Skeleton component for loading state
const GalleryPageSkeleton: React.FC = () => {
  // Predefined heights to avoid hydration issues with Math.random()
  const skeletonHeights = [
    280, 320, 240, 360, 300, 260, 340, 290, 350, 270, 310, 330,
  ];

  return (
    <main>
      <Navigation />

      {/* Hero Header Skeleton */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-[rgb(var(--theme-background))] to-[rgb(var(--theme-primary)/.05)] dark:from-gray-900 dark:to-gray-800">
        <div className="mx-auto max-w-[90rem] px-6">
          <div className="text-center">
            <div className="mb-8">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-32 mx-auto animate-pulse"></div>
            </div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-80 mx-auto mb-6 animate-pulse"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-96 mx-auto animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Gallery Content Skeleton */}
      <section className="py-16 bg-[rgb(var(--theme-background))] dark:bg-gray-900">
        <div className="mx-auto max-w-[90rem] px-6">
          {/* Masonry Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(12)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
                style={{ height: `${skeletonHeights[index]}px` }}
              ></div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

const GalleryPage = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryType | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const loadGalleryImages = async () => {
      try {
        setLoading(true);
        const images = await fetchGallery();
        setGalleryImages(images);
      } catch (err) {
        console.error("Error loading gallery images:", err);
        setError("Failed to load gallery images");
      } finally {
        setLoading(false);
      }
    };

    loadGalleryImages();
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedImage) return;

      if (e.key === "Escape") {
        setSelectedImage(null);
      } else if (e.key === "ArrowLeft") {
        navigateImage("prev");
      } else if (e.key === "ArrowRight") {
        navigateImage("next");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [selectedImage, currentImageIndex]);

  const openLightbox = (image: GalleryType, index: number) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "unset"; // Restore scrolling
  };

  const navigateImage = (direction: "prev" | "next") => {
    const newIndex =
      direction === "prev"
        ? (currentImageIndex - 1 + galleryImages.length) % galleryImages.length
        : (currentImageIndex + 1) % galleryImages.length;

    setCurrentImageIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
  };

  // Show skeleton while loading
  if (loading) {
    return <GalleryPageSkeleton />;
  }

  // Show error state
  if (error) {
    return (
      <main>
        <Navigation />
        <section className="pt-32 pb-20 bg-gradient-to-br from-[rgb(var(--theme-background))] to-[rgb(var(--theme-primary)/.05)] dark:from-gray-900 dark:to-gray-800">
          <div className="mx-auto max-w-[90rem] px-6">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-[rgb(var(--theme-on-surface))] mb-6">
                Gallery Unavailable
              </h1>
              <p className="text-[rgb(var(--theme-on-surface)/.6)] text-lg">
                {error}. Please try again later.
              </p>
              <Link
                href="/"
                className="inline-flex items-center mt-8 text-[rgb(var(--theme-primary))] hover:text-[rgb(var(--theme-accent))] transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // Show empty state
  if (galleryImages.length === 0) {
    return (
      <main>
        <Navigation />
        <section className="pt-32 pb-20 bg-gradient-to-br from-[rgb(var(--theme-background))] to-[rgb(var(--theme-primary)/.05)] dark:from-gray-900 dark:to-gray-800">
          <div className="mx-auto max-w-[90rem] px-6">
            <div className="text-center">
              <Camera className="w-16 h-16 text-[rgb(var(--theme-primary))] mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold text-[rgb(var(--theme-on-surface))] mb-6">
                No Images Yet
              </h1>
              <p className="text-[rgb(var(--theme-on-surface)/.6)] text-lg">
                Our gallery is currently empty. Check back soon for photos of
                our community and events!
              </p>
              <Link
                href="/"
                className="inline-flex items-center mt-8 text-[rgb(var(--theme-primary))] hover:text-[rgb(var(--theme-accent))] transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      {/* Navigation */}
      <Navigation />

      {/* Hero Header */}
      <section className="pt-32 pb-20 md:pt-36 md:pb-24 bg-gradient-to-br from-[rgb(var(--theme-background))] to-[rgb(var(--theme-primary)/.04)] dark:from-gray-900 dark:to-gray-800">
        <div className="mx-auto max-w-[90rem] px-6">
          <div
            className={`text-center transition-all duration-1000 transform ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            {/* Header Content */}
            <div className="mb-8">
              {/* Clean Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[rgb(var(--theme-on-surface))] mb-6">
                Church Gallery
              </h1>
            </div>

            {/* Simple Description */}
            <div className="max-w-3xl mx-auto mb-10">
              <p className="text-[rgb(var(--theme-on-surface)/.7)] text-lg md:text-xl leading-relaxed">
                Explore our vibrant church community through photos capturing
                our worship, fellowship, and events - the heart of our faith
                journey together in Karlskrona.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-16 bg-[rgb(var(--theme-background))] dark:bg-gray-900">
        <div className="mx-auto max-w-[90rem] px-6">
          {/* Masonry Gallery */}
          <div
            className={`transition-all duration-1000 delay-300 transform ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <Masonry
              breakpointCols={{
                default: 3,
                768: 2,
                640: 1,
              }}
              className="flex gap-4 w-full"
              columnClassName="flex flex-col gap-4"
            >
              {galleryImages.map((image, index) => (
                <div
                  key={image.id}
                  className="group relative overflow-hidden bg-white dark:bg-gray-800 rounded shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer break-inside-avoid"
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => openLightbox(image, index)}
                >
                  <div className="relative">
                    <Image
                      priority
                      src={image.image}
                      alt={image.name}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 block"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              ))}
            </Masonry>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          {/* Clickable overlay to close */}
          <div
            className="absolute inset-0 w-full h-full cursor-pointer"
            onClick={closeLightbox}
          />

          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-60 text-white hover:text-gray-300 transition-colors duration-200"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Desktop Navigation Arrows */}
          {galleryImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage("prev");
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-60 text-white hover:text-gray-300 transition-colors duration-200 hidden md:block"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage("next");
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-60 text-white hover:text-gray-300 transition-colors duration-200 hidden md:block"
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8" />
              </button>

              {/* Mobile Navigation Arrows - Bottom Center */}
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-60 flex items-center gap-8 md:hidden">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage("prev");
                  }}
                  className="text-white hover:text-gray-300 transition-colors duration-200 bg-black/50 rounded-full p-3"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage("next");
                  }}
                  className="text-white hover:text-gray-300 transition-colors duration-200 bg-black/50 rounded-full p-3"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </>
          )}

          {/* Image Container */}
          <div className="relative z-50 flex items-center justify-center">
            <Image
              priority
              src={selectedImage.image}
              alt={selectedImage.name}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              style={{ maxHeight: "90vh", maxWidth: "90vw" }}
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default GalleryPage;
