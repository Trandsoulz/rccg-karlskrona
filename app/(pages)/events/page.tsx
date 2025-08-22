"use client";

import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";
import { EventCard } from "@/app/components/event-card";
import React, { useState, useEffect } from "react";
import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { fetchEvents } from "@/app/sanity/queries";
import { Event } from "@/app/types/event";

// Skeleton component for loading state
const EventsPageSkeleton: React.FC = () => {
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

      {/* Events Content Skeleton */}
      <section className="py-16 bg-[rgb(var(--theme-background))] dark:bg-gray-900">
        <div className="mx-auto max-w-[90rem] px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse h-80"
              ></div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const eventsData = await fetchEvents();
        setEvents(eventsData);
      } catch (err) {
        console.error("Error loading events:", err);
        setError("Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  // Show skeleton while loading
  if (loading) {
    return <EventsPageSkeleton />;
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
                Events Unavailable
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
        <Footer />
      </main>
    );
  }

  // Show empty state
  if (events.length === 0) {
    return (
      <main>
        <Navigation />
        <section className="pt-32 pb-20 bg-gradient-to-br from-[rgb(var(--theme-background))] to-[rgb(var(--theme-primary)/.05)] dark:from-gray-900 dark:to-gray-800">
          <div className="mx-auto max-w-[90rem] px-6">
            <div className="text-center">
              <Calendar className="w-16 h-16 text-[rgb(var(--theme-primary))] mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold text-[rgb(var(--theme-on-surface))] mb-6">
                No Upcoming Events
              </h1>
              <p className="text-[rgb(var(--theme-on-surface)/.6)] text-lg">
                We don&apos;t have any events scheduled at the moment. Check back soon for upcoming church activities and gatherings!
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
        <Footer />
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
                Church Events
              </h1>
            </div>

            {/* Simple Description */}
            <div className="max-w-3xl mx-auto mb-10">
              <p className="text-[rgb(var(--theme-on-surface)/.7)] text-lg md:text-xl leading-relaxed">
                Join us for meaningful gatherings, worship services, and community events that strengthen our faith and fellowship together in Karlskrona.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Events Content */}
      <section className="py-16 bg-[rgb(var(--theme-background))] dark:bg-gray-900">
        <div className="mx-auto max-w-[90rem] px-6">
          {/* Events Grid */}
          <div
            className={`transition-all duration-1000 delay-300 transform ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, index) => (
                <div
                  key={event.id}
                  className="transition-all duration-500 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <EventCard
                    id={event.id}
                    title={event.title}
                    date={event.date}
                    image={event.image}
                    ctaLink={event.ctaLink}
                    className="h-full shadow-lg hover:shadow-2xl transition-all duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default EventsPage;
