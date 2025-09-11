"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, Target } from "lucide-react";

interface ValueCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  backgroundImage: string;
  ctaText: string;
  ctaLink: string;
}

const coreValues: ValueCard[] = [
  {
    id: "what-we-believe",
    title: "What We Believe",
    description: "Our faith and biblical foundations.",
    icon: <Heart className="w-6 h-6 text-[rgb(var(--theme-accent))]" />,
    backgroundImage: "/rccg-belief.jpg",
    ctaText: "Explore",
    ctaLink: "/beliefs",
  },
  {
    id: "our-values",
    title: "Our Values",
    description: "Unity, fellowship, and spiritual growth.",
    icon: <Users className="w-6 h-6 text-[rgb(var(--theme-accent))]" />,
    backgroundImage: "/rccg-values.jpg",
    ctaText: "Discover",
    ctaLink: "/values",
  },
  {
    id: "our-priorities",
    title: "Our Priorities",
    description: "Worship, evangelism, and community service.",
    icon: <Target className="w-6 h-6 text-[rgb(var(--theme-accent))]" />,
    backgroundImage: "/rccg-priorities.jpg",
    ctaText: "Learn More",
    ctaLink: "/priorities",
  },
];

export function CoreValues() {
  return (
    <section className="py-12 bg-[rgb(var(--theme-background))] dark:bg-gray-900">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-[rgb(var(--theme-on-surface))] dark:text-gray-100">
            Our Foundation
          </h2>
          <p className="text-[rgb(var(--theme-on-surface)/.6)] dark:text-gray-400 max-w-2xl mx-auto">
            Discover what drives us as one family in Karlskrona, Sweden.
          </p>  
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[100rem] mx-auto">
          {coreValues.map((value) => (
            <Card
              key={value.id}
              className="group relative overflow-hidden border border-[rgb(var(--theme-primary))] dark:border-blue-400 shadow-md hover:shadow-lg duration-300 cursor-pointer bg-[rgb(var(--theme-background))] dark:bg-gray-800 rounded-none"
            >
              {/* Background Image */}
              <div className="relative w-[90%] mx-auto h-48 overflow-hidden">
                <Image
                  src={value.backgroundImage}
                  alt={value.title}
                  fill
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Simplified Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Icon */}
                <div className="absolute top-4 left-4 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full">
                  {value.icon}
                </div>
              </div>

              {/* Card Content */}
              <CardContent className="p-4">
                <CardTitle className="text-lg font-semibold text-[rgb(var(--theme-primary))] dark:text-blue-200 mb-2">
                  {value.title}
                </CardTitle>
                <CardDescription className="text-[rgb(var(--theme-on-surface)/.6)] dark:text-gray-400 text-sm mb-4 line-clamp-1">
                  {value.description}
                </CardDescription>
                <Link href={value.ctaLink}>
                  <Button
                    variant="link"
                    size="sm"
                    className="text-[rgb(var(--theme-primary))] dark:text-blue-400 p-0 h-auto font-medium hover:text-[rgb(var(--theme-primary)/.8)] dark:hover:text-blue-300 transition-colors"
                  >
                    {value.ctaText} →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CoreValues;
