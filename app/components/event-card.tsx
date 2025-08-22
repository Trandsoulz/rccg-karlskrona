import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  image?: string;
  ctaLink?: string;
  className?: string;
}

export function EventCard({
  title,
  date,
  image,
  ctaLink,
  className,
}: EventCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden bg-[rgb(var(--theme-background))] dark:bg-gray-800 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer",
        className
      )}
    >
      {/* Event Image */}
      {image && (
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="p-3 md:p-4">
        {/* Date */}
        <div className="flex items-center text-[rgb(var(--theme-primary))] text-xs md:text-sm mb-2">
          <Calendar className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" />
          {formatDate(date)}
        </div>

        {/* Title */}
        <h3 className="text-base md:text-lg font-bold text-[rgb(var(--theme-on-surface))] mb-3 line-clamp-1">
          {title}
        </h3>

        {/* CTA Button */}
        <Link href={`/events/${ctaLink}`}>
          <Button 
            className="w-full bg-[rgb(var(--theme-primary))] hover:bg-[rgb(var(--theme-primary)/.8)] text-white text-sm py-2 transition-colors duration-200 rounded-none cursor-pointer"
          >
            Learn More
          </Button>
        </Link>
      </div>
    </div>
  );
}
