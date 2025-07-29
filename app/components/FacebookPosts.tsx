"use client";

import { useCallback, useEffect, useState, useMemo, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { fetchFaceBookPosts } from "@/sanity/queries";
import { FacebookPost } from "@/types/facebook";

interface FacebookPostsProps {
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showIndicators?: boolean;
}

/**
 * FacebookPosts - Simple Facebook Posts Carousel
 *
 * Displays Facebook posts in an iframe carousel format
 * Fetches data from Sanity CMS and handles loading/error states
 */
export function FacebookPosts({
  autoPlay = true,
  autoPlayInterval = 8000,
  showIndicators = true,
}: FacebookPostsProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [posts, setPosts] = useState<FacebookPost[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Facebook posts on mount
  useEffect(() => {
    async function loadPosts() {
      try {
        const facebookPosts = await fetchFaceBookPosts();

        if (facebookPosts.length > 0) {
          setPosts(facebookPosts);
        } else {
          setError("No Facebook posts found");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch Facebook posts"
        );
        console.error("FacebookPosts: Error fetching posts:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadPosts();
  }, []);

  const autoplayPlugin = useRef(
    Autoplay({
      delay: autoPlayInterval,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
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

  // Memoize iframe content to prevent reloads
  const memoizedPosts = useMemo(() => {
    return posts.map((post) => ({
      ...post,
      iframeElement: post.iframeCode ? (
        <div
          key={`iframe-${post.id}`}
          dangerouslySetInnerHTML={{ __html: post.iframeCode }}
          className="[&>iframe]:w-full [&>iframe]:h-[300px] [&>iframe]:border-0 [&>iframe]:rounded-xl"
        />
      ) : null,
    }));
  }, [posts]);

  // Show loading state
  if (isLoading) {
    return (
      <section className="w-full py-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          {/* Section Header Skeleton */}
          <div className="text-center mb-12">
            <div className="h-6 md:h-8 bg-[rgb(var(--theme-on-surface)/.1)] dark:bg-gray-700 rounded animate-pulse mb-4 mx-auto max-w-md"></div>
            <div className="h-4 bg-[rgb(var(--theme-on-surface)/.1)] dark:bg-gray-700 rounded animate-pulse mx-auto max-w-2xl"></div>
          </div>
          
          {/* Loading Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="bg-[rgb(var(--theme-background))] dark:bg-gray-800 shadow-lg p-4 md:p-6 animate-pulse"
              >
                <div className="h-64 md:h-72 bg-[rgb(var(--theme-on-surface)/.1)] dark:bg-gray-700 mb-4"></div>
                <div className="h-3 md:h-4 bg-[rgb(var(--theme-on-surface)/.1)] dark:bg-gray-700 mb-2"></div>
                <div className="h-3 md:h-4 bg-[rgb(var(--theme-on-surface)/.1)] dark:bg-gray-700 w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error || posts.length === 0) {
    return (
      <section className="w-full py-8">
        <div className="container mx-auto px-6">
          <div className="text-center text-[rgb(var(--theme-on-surface)/.6)]">
            <svg
              className="w-12 h-12 mx-auto mb-4 text-[rgb(var(--theme-on-surface)/.4)]"
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
            <p className="text-lg font-medium mb-2">
              Facebook Posts Unavailable
            </p>
            <p className="text-sm">
              {error || "No Facebook posts found in the CMS"}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center gap-3">
              {/* <svg
                className="w-8 h-8 text-[rgb(var(--theme-primary))] dark:text-blue-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg> */}
              <h2 className="text-3xl md:text-4xl font-bold text-[rgb(var(--theme-on-surface))]">
                Connect With Us
              </h2>
            </div>
          </div>
          <p className="text-lg text-[rgb(var(--theme-on-surface)/.7)] max-w-3xl mx-auto leading-relaxed">
            Stay up to date with our church community through our latest
            Facebook posts.
          </p>
        </div>

        {/* Facebook Posts Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <Carousel
            setApi={setApi}
            className="w-full"
            plugins={autoPlay ? [autoplayPlugin.current] : []}
            opts={{
              align: "center",
              loop: true,
              dragFree: true,
              containScroll: "trimSnaps",
            }}
          >
            <CarouselContent className="-ml-6">
              {memoizedPosts.map((post) => (
                <CarouselItem
                  key={post.id}
                  className="pl-6 basis-full md:basis-1/2 lg:basis-1/2 xl:basis-1/3"
                >
                  <div className="group relative">
                    {/* Facebook Iframe with enhanced styling */}
                    {post.iframeElement ? (
                      <div className="relative overflow-hidden rounded-xl duration-300 group-hover:scale-[1.02] bg-[rgb(var(--theme-background))] dark:bg-gray-800">
                        {post.iframeElement}
                        {/* Subtle overlay for interaction feedback */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"></div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-[350px] bg-gradient-to-br from-[rgb(var(--theme-background)/.3)] to-[rgb(var(--theme-background)/.5)] dark:from-gray-700 dark:to-gray-800 text-[rgb(var(--theme-on-surface)/.5)] dark:text-gray-400 rounded-xl shadow-lg border-2 border-dashed border-[rgb(var(--theme-on-surface)/.2)] dark:border-gray-600">
                        <svg
                          className="w-12 h-12 mb-4 text-[rgb(var(--theme-on-surface)/.4)] dark:text-gray-500"
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
                        <p className="text-lg font-medium">
                          No content available
                        </p>
                        <p className="text-sm mt-1">
                          This post couldn&apos;t be loaded
                        </p>
                      </div>
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Enhanced Slide Indicators */}
          {showIndicators && memoizedPosts.length > 1 && (
            <div className="flex justify-center mt-8">
              <div className="flex gap-3 bg-[rgb(var(--theme-background)/.9)] dark:bg-gray-800/90 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-[rgb(var(--theme-on-surface)/.1)] dark:border-gray-700/20">
                {memoizedPosts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                      current === index + 1
                        ? "bg-[rgb(var(--theme-primary))] shadow-lg scale-110"
                        : "bg-[rgb(var(--theme-on-surface)/.3)] hover:bg-[rgb(var(--theme-primary)/.7)]"
                    }`}
                    aria-label={`Go to post ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default FacebookPosts;
