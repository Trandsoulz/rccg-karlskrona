"use client";

import React, { useEffect, useState } from "react";
import { EventCard } from "@/app/components/event-card";
import { fetchEvents } from "@/sanity/queries";
import { Event } from "@/types/event";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import Link from "next/link";

interface EventsProps {
  maxEvents?: number;
  title?: string;
  description?: string;
  viewAllLink?: string;
}

/**
 * Events - Featured Events and Ministries Section
 *
 * Displays upcoming events and ministries in a responsive grid/carousel format
 * Fetches data from Sanity CMS and handles loading/error states
 * Features Swedish blue/yellow accent colors and interactive hover effects
 */
export default function Events({
  maxEvents = 6,
  title = "Upcoming Events",
  description = "Discover opportunities to grow in faith and connect with our vibrant community.",
  viewAllLink = "/events",
}: EventsProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch events on mount
  useEffect(() => {
    async function loadEvents() {
      try {
        const fetchedEvents = await fetchEvents();
        
        if (fetchedEvents.length > 0) {
          // Limit number of events - 3 for mobile, maxEvents for desktop
          const eventLimit = isMobile ? Math.min(3, maxEvents) : maxEvents;
          const filteredEvents = fetchedEvents.slice(0, eventLimit);
          setEvents(filteredEvents);
        } else {
          setError("No events found in CMS");
        }
      } catch (err) {
        setError("Failed to load events. Please try again later.");
        console.warn("Events: Error fetching events:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadEvents();
  }, [maxEvents, isMobile]);

  // Loading State
  if (isLoading) {
    return (
      <section className="py-8 md:py-16 px-4 md:px-6 bg-gradient-to-br from-[rgb(var(--theme-surface))] via-[rgb(var(--theme-background))] to-[rgb(var(--theme-surface))] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <div className="h-6 md:h-8 bg-[rgb(var(--theme-on-surface)/.2)] rounded animate-pulse mb-4 mx-auto max-w-md"></div>
            <div className="h-4 bg-[rgb(var(--theme-on-surface)/.2)] rounded animate-pulse mx-auto max-w-2xl"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="bg-[rgb(var(--theme-background))] dark:bg-gray-800 shadow-lg p-4 md:p-6 animate-pulse"
              >
                <div className="h-40 md:h-48 bg-[rgb(var(--theme-on-surface)/.2)] mb-4"></div>
                <div className="h-3 md:h-4 bg-[rgb(var(--theme-on-surface)/.2)] mb-2"></div>
                <div className="h-5 md:h-6 bg-[rgb(var(--theme-on-surface)/.2)] mb-2"></div>
                <div className="h-3 md:h-4 bg-[rgb(var(--theme-on-surface)/.2)] mb-3 md:mb-4"></div>
                <div className="h-8 md:h-10 bg-[rgb(var(--theme-on-surface)/.2)]"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section className="py-16 px-6 bg-gradient-to-br from-[rgb(var(--theme-surface))] via-[rgb(var(--theme-background))] to-[rgb(var(--theme-surface))] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-[rgb(var(--theme-background))] dark:bg-gray-800 shadow-lg p-12 max-w-md mx-auto">
            <Calendar className="w-12 h-12 text-[rgb(var(--theme-on-surface)/.4)] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[rgb(var(--theme-on-surface))] mb-2">
              No Events Available
            </h3>
            <p className="text-[rgb(var(--theme-on-surface)/.6)] mb-6">{error}</p>
            <Link href="/contact">
              <Button variant="outline" className="cursor-pointer">
                Contact Us for Updates
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-16 px-4 md:px-6 bg-gradient-to-br from-[rgb(var(--theme-surface))] via-[rgb(var(--theme-background))] to-[rgb(var(--theme-surface))] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center mb-4">
            <h2 className="text-2xl md:text-4xl font-bold text-[rgb(var(--theme-on-surface))]">
              {title}
            </h2>
          </div>
          <p className="text-base md:text-lg text-[rgb(var(--theme-on-surface)/.7)] max-w-3xl mx-auto px-4">
            {description}
          </p>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12">
          {events.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              date={event.date}
              image={event.image}
              ctaLink={event.ctaLink}
            />
          ))}
        </div>

        {/* View All Events CTA */}
        <div className="text-center">
          <Link href={viewAllLink}>
            <Button 
              size="lg"
              className="bg-[rgb(var(--theme-primary))] hover:bg-[rgb(var(--theme-primary)/.8)] text-white px-6 md:px-8 py-2.5 md:py-3 text-base md:text-lg font-semibold transition-all duration-200 hover:scale-105 rounded-none cursor-pointer"
            >
              View All Events & Ministries
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
