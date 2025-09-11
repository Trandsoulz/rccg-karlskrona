"use client";

import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";
import React, { useState, useEffect } from "react";
import { Calendar, ArrowLeft, Users, Share2, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { fetchEventById } from "@/app/sanity/queries";
import { Event } from "@/app/types/event";
import { Button } from "@/components/ui/button";

interface EventPageProps {
  params: Promise<{ id: string }>;
}

const EventPage = ({ params }: EventPageProps) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [isShared, setIsShared] = useState(false);
  const resolvedParams = React.use(params);

  useEffect(() => {
    fetchEventById(resolvedParams.id)
      .then(setEvent)
      .finally(() => setLoading(false));
  }, [resolvedParams.id]);

  const shareEvent = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    } else {
      // Fallback for unsecure contexts
      const textArea = document.createElement("textarea");
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
    setIsShared(true);
    setTimeout(() => setIsShared(false), 5000);
  };

  const addToCalendar = () => {
    if (!event) return;

    // Format date for Google Calendar (YYYYMMDDTHHMMSSZ)
    const eventDate = new Date(event.date);
    const startDate =
      eventDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    // Assume event duration is 3 hours
    const endDate =
      new Date(eventDate.getTime() + 3 * 60 * 60 * 1000)
        .toISOString()
        .replace(/[-:]/g, "")
        .split(".")[0] + "Z";

    const calendarUrl = new URL("https://calendar.google.com/calendar/render");
    calendarUrl.searchParams.set("action", "TEMPLATE");
    calendarUrl.searchParams.set("text", event.title);
    calendarUrl.searchParams.set("dates", `${startDate}/${endDate}`);
    calendarUrl.searchParams.set(
      "details",
      event.description ||
        `Join us for ${event.title} at King's Palace Parish. All are welcome!`
    );
    calendarUrl.searchParams.set(
      "location",
      "King's Palace Parish, RCCG Sweden"
    );

    window.open(calendarUrl.toString(), "_blank");
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const infoCards = [
    {
      icon: Users,
      title: "Community",
      desc: "Join fellow believers in fellowship and worship",
    },
    {
      icon: Calendar,
      title: "All Welcome",
      desc: "Everyone is invited regardless of background",
    },
    {
      icon: Heart,
      title: "What to Bring",
      desc: "Just bring yourself and an open heart",
    },
  ];

  if (loading) {
    return (
      <main>
        <Navigation />
        <section className="pt-32 pb-20 bg-gradient-to-br from-[rgb(var(--theme-background))] to-[rgb(var(--theme-primary)/.05)] dark:from-gray-900 dark:to-gray-800 mx-auto max-w-[100rem]">
          <div className="px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-${
                      i === 0 ? "12" : "4"
                    } bg-gray-200 dark:bg-gray-700 rounded animate-pulse`}
                  />
                ))}
              </div>
              <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (!event) {
    return (
      <main>
        <Navigation />
        <section className="pt-32 pb-20 bg-gradient-to-br from-[rgb(var(--theme-background))] to-[rgb(var(--theme-primary)/.05)] dark:from-gray-900 dark:to-gray-800 mx-auto max-w-[100rem]">
          <div className="px-6 text-center">
            <Calendar className="w-16 h-16 text-[rgb(var(--theme-primary))] mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-[rgb(var(--theme-on-surface))] mb-6">
              Event Not Found
            </h1>
            <p className="text-[rgb(var(--theme-on-surface)/.6)] text-lg mb-8">
              The event you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Link
              href="/events"
              className="inline-flex items-center text-[rgb(var(--theme-primary))] hover:text-[rgb(var(--theme-accent))] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-36 md:pb-24 bg-gradient-to-br from-[rgb(var(--theme-background))] to-[rgb(var(--theme-primary)/.05)] dark:from-gray-900 dark:to-gray-800 mx-auto max-w-[100rem]">
        <div className="px-6">
          <Link
            href="/events"
            className="inline-flex items-center text-[rgb(var(--theme-primary))] hover:text-[rgb(var(--theme-accent))] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[rgb(var(--theme-on-surface))] mb-6 leading-tight">
                {event.title}
              </h1>

              <p className="text-[rgb(var(--theme-on-surface)/.7)] text-lg leading-relaxed mb-8">
                {event.description ||
                  `Join us for ${event.title} at King's Palace Parish. All are welcome!`}
              </p>

              <div className="flex items-center text-[rgb(var(--theme-on-surface)/.8)] mb-8">
                <Calendar className="w-5 h-5 text-[rgb(var(--theme-primary))] mr-3" />
                <span className="font-medium">{formatDate(event.date)}</span>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={addToCalendar}
                  className="bg-[rgb(var(--theme-primary))] hover:bg-[rgb(var(--theme-primary)/.8)] text-white px-8 py-3 rounded-none cursor-pointer"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Add to Calendar
                </Button>
                <Button
                  variant="outline"
                  onClick={shareEvent}
                  disabled={false}
                  className={`${
                    isShared
                      ? "bg-green-500 text-white border-green-500 hover:bg-green-600 hover:text-white"
                      : "border-[rgb(var(--theme-primary))] text-[rgb(var(--theme-primary))] hover:bg-[rgb(var(--theme-primary))] hover:text-white"
                  } px-8 py-3 rounded-none transition-all duration-300 cursor-pointer`}
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  {isShared ? "Copied!" : "Share"}
                </Button>
              </div>
            </div>

            {event.image ? (
              <Image
                src={event.image}
                alt={event.title}
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto"
                priority
              />
            ) : (
              <div className="aspect-[4/3] bg-[rgb(var(--theme-primary)/.1)] rounded-lg flex items-center justify-center w-full">
                <Calendar className="w-16 h-16 text-[rgb(var(--theme-primary)/.5)]" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-16 bg-[rgb(var(--theme-background))] dark:bg-gray-900">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {infoCards.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="text-center p-6 bg-[rgb(var(--theme-surface))] dark:bg-gray-800 rounded-lg"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[rgb(var(--theme-primary)/.1)] rounded-full mb-4">
                  <Icon className="w-6 h-6 text-[rgb(var(--theme-primary))]" />
                </div>
                <h3 className="text-lg font-semibold text-[rgb(var(--theme-on-surface))] mb-2">
                  {title}
                </h3>
                <p className="text-[rgb(var(--theme-on-surface)/.7)] text-sm">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default EventPage;
