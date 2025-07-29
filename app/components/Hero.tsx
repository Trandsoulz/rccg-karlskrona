"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { fetchBanners } from "@/sanity/queries";
import { Banner } from "@/types/banner";

interface HeroSlide {
  id: string;
  mainHeading: string;
  supportingText: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
  eventLogo?: string;
}

interface HeroProps {
  autoPlay?: boolean;
  autoPlayInterval?: number;
  imageScale?: number;
  staticSlides?: HeroSlide[]; // Optional prop to use static slides instead of Sanity
}

/**
 * Hero - The ONLY Hero Component You Need
 *
 * This component handles everything:
 * - Fetches banner data from Sanity CMS
 * - Shows error message if banners can't be fetched (no fallback images)
 * - Renders interactive carousel
 * - Handles all user interactions
 *
 * Usage:
 * <Hero /> // Uses Sanity banners with error handling
 * <Hero staticSlides={mySlides} /> // Uses custom slides
 */
export function Hero({
  autoPlay = true,
  autoPlayInterval = 5000,
  imageScale = 1,
  staticSlides,
}: HeroProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  //   const [dataSource, setDataSource] = useState("loading");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch banners on mount (unless static slides are provided)
  useEffect(() => {
    async function loadBanners() {
      // If static slides are provided, use them instead
      if (staticSlides && staticSlides.length > 0) {
        setSlides(staticSlides);
        // setDataSource("static");
        setIsLoading(false);
        return;
      }

      try {
        const banners: Banner[] = await fetchBanners();

        if (banners.length > 0) {
          // Transform banners to slide format
          const sanitySlides = banners.map((banner) => ({
            id: banner.id,
            mainHeading: banner.mainHeading,
            supportingText: banner.supportingText,
            ctaText: banner.ctaText,
            ctaLink: banner.ctaLink,
            backgroundImage: banner.backgroundImage,
          }));
          setSlides(sanitySlides);
          //   setDataSource(`sanity (${banners.length} banners)`);
          setIsLoading(false);
        } else {
          setError("No banners found in CMS");
          //   setDataSource("error (no banners)");
          setIsLoading(false);
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch banners from CMS"
        );
        console.error("Hero: Error fetching banners:", err);
        // setDataSource("error (fetch failed)");
        setIsLoading(false);
      }
    }

    loadBanners();
  }, [staticSlides]);

  const autoplayPlugin = React.useRef(
    Autoplay({
      delay: autoPlayInterval,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnFocusIn: false,
    })
  );

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  // Show loading state
  if (isLoading) {
    return (
      <section className="relative w-full h-screen min-h-[100vh] overflow-hidden bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-lg">Loading banners...</p>
        </div>
      </section>
    );
  }

  // Show error state
  if (error || slides.length === 0) {
    return (
      <section className="relative w-full h-screen min-h-[100vh] overflow-hidden bg-gradient-to-br from-red-900/90 to-gray-900 flex items-center justify-center">
        <div className="text-center text-white max-w-2xl mx-auto px-6">
          <div className="mb-6">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Unable to Load Banner Images
          </h1>
          <p className="text-lg md:text-xl text-red-200 mb-6">
            {error || "No banner content found in the CMS"}
          </p>
          <p className="text-base text-gray-300 mb-8">
            Please check your internet connection or contact the site
            administrator if this problem persists.
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300"
          >
            Try Again
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full h-screen min-h-[100vh] overflow-hidden">
      <Carousel
        setApi={setApi}
        className="w-full h-full relative"
        plugins={autoPlay ? [autoplayPlugin.current] : []}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent
          className="h-full -ml-0"
          style={{ height: "100vh", minHeight: "100vh" }}
        >
          {slides.map((slide) => (
            <CarouselItem
              key={slide.id}
              className="h-full pl-0 basis-full"
              style={{ height: "100vh", minHeight: "100vh" }}
            >
              <div className="relative w-full h-full">
                {/* Background Image */}
                <div className="absolute inset-0 z-0 max-w-[90rem] mx-auto overflow-hidden">
                  <div
                    className="w-full h-full flex items-center justify-center overflow-hidden"
                    style={{
                      transform: `scale(${imageScale})`,
                      transformOrigin: "center",
                    }}
                  >
                    <Image
                      src={slide.backgroundImage}
                      alt={slide.mainHeading}
                      fill
                      className="object-cover object-center transition-transform duration-700 ease-in-out hover:scale-105"
                      priority
                      quality={90}
                    />
                  </div>
                  {/* Enhanced Dark Overlay with Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 h-full flex items-center">
                  <div className="container mx-auto px-6 md:px-8">
                    <div className="max-w-4xl">
                      {/* Event Logo (if provided) */}
                      {slide.eventLogo && (
                        <div className="mb-8 animate-fade-in">
                          <Image
                            src={slide.eventLogo}
                            alt="Event Logo"
                            width={200}
                            height={100}
                            className="object-contain drop-shadow-lg"
                          />
                        </div>
                      )}

                      {/* Main Heading */}
                      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight tracking-wide drop-shadow-2xl">
                        {slide.mainHeading}
                      </h1>

                      {/* Supporting Text */}
                      <p className="text-base md:text-lg lg:text-xl text-white/90 mb-8 font-light leading-relaxed max-w-2xl drop-shadow-lg">
                        {slide.supportingText}
                      </p>

                      {/* CTA Button */}
                      <div className="mt-8">
                        <Button
                          asChild
                          className="group relative bg-transparent border-2 border-white hover:bg-emerald-600 text-white font-semibold rounded-none px-9 py-6 text-base uppercase tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
                        >
                          <a href={slide.ctaLink} className="relative z-10">
                            <span className="flex items-center justify-center gap-3">
                              {slide.ctaText}
                              <svg
                                className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300 ease-out"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                strokeWidth={2.5}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                              </svg>
                            </span>
                            {/* Enhanced shine effect */}
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-500 ease-in-out"></div>
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Enhanced Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex gap-4 bg-black/30 backdrop-blur-sm rounded-full px-6 py-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 transform hover:scale-110 ${
                current === index + 1
                  ? "bg-white dark:bg-gray-300 shadow-lg shadow-white-500/50 dark:shadow-gray-300/50"
                  : "bg-white/60 dark:bg-gray-300/60 hover:bg-white/90 dark:hover:bg-gray-300/90"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
