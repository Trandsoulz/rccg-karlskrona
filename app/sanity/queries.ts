"use server"

import { client } from "./client";
import { SanityBanner, Banner } from "@/app/types/banner";
import { SanityFacebookPost, FacebookPost } from "@/app/types/facebook";
import { SanityEvent, Event } from "@/app/types/event";
import { SanityVerse, Verse } from "@/app/types/verse";
import { SanityGallery, Gallery } from "@/types/gallery";
import { getOptimizedImageUrl, getMaxQualityImageUrl } from "@/lib/sanity-image";

// Groq query to fetch banners
const BANNER_QUERY = `*[_type == "banner"] {
  _id,
  mainHeading,
  supportingText,
  ctaText,
  ctaLink,
  backgroundImage,
  publishedAt
} | order(publishedAt asc)`;

const FACEBOOK_QUERY = `*[_type == "facebook"] | order(publishedAt desc) {
  _id,
  iframeCode,
  publishedAt
}`;

const EVENT_QUERY = `*[_type == "event"] | order(publishedAt desc) {
  _id,
  title,
  description,
  date,
  image,
  ctaLink,
  publishedAt
}`;

const VERSE_OF_THE_DAY_QUERY = `*[_type == "verse"] | order(publishedAt desc) {
  _id,
  text,
  book,
  chapter,
  verse,
  publishedAt
}`;

const GALLERY_QUERY = `*[_type == "gallery"] | order(uploadedAt asc) {
  _id,
  name,
  image,
  uploadedAt
}`;

// Fetch banners from Sanity
export async function fetchBanners(): Promise<Banner[]> {
  try {
    const banners: SanityBanner[] = await client.fetch(BANNER_QUERY);
    
    // Transform Sanity data to Banner format
    return banners.map(banner => ({
      id: banner._id,
      mainHeading: banner.mainHeading,
      supportingText: banner.supportingText,
      ctaText: banner.ctaText,
      ctaLink: banner.ctaLink,
      backgroundImage: banner.backgroundImage 
        ? getOptimizedImageUrl(banner.backgroundImage, 1920, 800)
        : '',
    }));
  } catch (error) {
    console.error('Error fetching banners:', error);
    return [];
  }
}

// Fetch a single banner by ID
export async function fetchBannerById(id: string): Promise<Banner | null> {
  try {
    const banner: SanityBanner = await client.fetch(
      `*[_type == "banner" && _id == $id][0] {
        _id,
        mainHeading,
        supportingText,
        ctaText,
        ctaLink,
        backgroundImage,
        publishedAt
      }`,
      { id }
    );

    if (!banner) {
      return null;
    }

    return {
      id: banner._id,
      mainHeading: banner.mainHeading,
      supportingText: banner.supportingText,
      ctaText: banner.ctaText,
      ctaLink: banner.ctaLink,
      backgroundImage: banner.backgroundImage 
        ? getOptimizedImageUrl(banner.backgroundImage, 1920, 800)
        : '',
    };
  } catch (error) {
    console.error('Error fetching banner by ID:', error);
    return null;
  }
}


export async function fetchFaceBookPosts(): Promise<FacebookPost[]> {
  try {
    const posts: SanityFacebookPost[] = await client.fetch(FACEBOOK_QUERY);
    return posts.map((post: SanityFacebookPost) => ({
      id: post._id,
      iframeCode: post.iframeCode,
      publishedAt: post.publishedAt,
    }));
  } catch (error) {
    console.error('Error fetching Facebook posts:', error);
    return [];
  }
}

// Fetch events from Sanity
export async function fetchEvents(): Promise<Event[]> {
  try {
    const events: SanityEvent[] = await client.fetch(EVENT_QUERY);
    
    // Transform Sanity data to Event format
    return events.map(event => ({
      id: event._id,
      title: event.title,
      description: event.description,
      date: event.date,
      image: event.image 
        ? getOptimizedImageUrl(event.image)
        : '',
      ctaLink: event.ctaLink,
    }));
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

// Fetch a single event by slug/ctaLink
export async function fetchEventById(slug: string): Promise<Event | null> {
  try {
    const event: SanityEvent = await client.fetch(
      `*[_type == "event" && ctaLink == $slug][0] {
        _id,
        title,
        description,
        date,
        image,
        ctaLink,
        publishedAt
      }`,
      { slug }
    );

    if (!event) {
      return null;
    }

    return {
      id: event._id,
      title: event.title,
      description: event.description,
      date: event.date,
      image: event.image 
        ? getMaxQualityImageUrl(event.image)
        : '',
      ctaLink: event.ctaLink,
    };
  } catch (error) {
    console.error('Error fetching event by ID:', error);
    return null;
  }
}

// Fetch a single event by ctaLink
export async function fetchEventByCtaLink(ctaLink: string): Promise<Event | null> {
  try {
    const event: SanityEvent = await client.fetch(
      `*[_type == "event" && ctaLink == $ctaLink][0] {
        _id,
        title,
        description,
        date,
        image,
        ctaLink,
        publishedAt
      }`,
      { ctaLink }
    );

    if (!event) {
      return null;
    }

    return {
      id: event._id,
      title: event.title,
      description: event.description,
      date: event.date,
      image: event.image 
        ? getOptimizedImageUrl(event.image, 600, 400)
        : '',
      ctaLink: event.ctaLink,
    };
  } catch (error) {
    console.error('Error fetching event by ctaLink:', error);
    return null;
  }
}

/*

// Fetch a specific event
const event = await fetchEventByCtaLink("/events/prayer-retreat-2025");

// In a dynamic route app/events/[slug]/page.tsx
export default async function EventPage({ params }: { params: { slug: string } }) {
  const event = await fetchEventByCtaLink(`/events/${params.slug}`);
  
  if (!event) {
    notFound();
  }
  
  return (
    // Your event page component
  );
}


ctaLink: /events/prayer-retreat-2025
Route: app/events/[slug]/page.tsx
URL: https://yoursite.com/events/prayer-retreat-2025
params.slug: "prayer-retreat-2025"
*/

// Fetch verses from Sanity
export async function fetchVerses(): Promise<Verse[]> {
  try {
    const verses: SanityVerse[] = await client.fetch(VERSE_OF_THE_DAY_QUERY);

    // Transform Sanity data to Verse format
    return verses.map(verse => ({
      id: verse._id,
      text: verse.text,
      book: verse.book,
      chapter: verse.chapter,
      verse: verse.verse,
    }));
  } catch (error) {
    console.error('Error fetching verses:', error);
    return [];
  }
}

// Get today's verse using random selection that changes at midnight
// Uses date-based pseudo-random selection to ensure all users see the same verse each day
export async function fetchVerseOfTheDay(): Promise<Verse | null> {
  try {
    // First, fetch all available verses from Sanity CMS
    const verses = await fetchVerses();
    
    // Return null if no verses are available in the CMS
    if (verses.length === 0) {
      return null;
    }
    
    // =================================================================
    // DATE-BASED RANDOM SELECTION ALGORITHM
    // =================================================================
    
    // Get today's date as a string (YYYY-MM-DD format)
    // This ensures all users get the same verse on the same day
    const today = new Date();
    const dateString = today.toISOString().split('T')[0]; // Example: "2025-07-29"
    
    // Create a hash from the date string for pseudo-random selection
    // This algorithm converts the date string into a number
    let hash = 0;
    for (let i = 0; i < dateString.length; i++) {
      const char = dateString.charCodeAt(i);        // Get ASCII code of character
      hash = ((hash << 5) - hash) + char;           // Bit shifting for hash generation
      hash = hash & hash;                           // Convert to 32-bit integer
    }
    
    // Convert hash to positive number and get index within verses array
    // The modulo operation ensures we get a valid array index
    const verseIndex = Math.abs(hash) % verses.length;
    
    // Return the selected verse
    return verses[verseIndex];
    
  } catch (error) {
    // Log error and return null if anything goes wrong
    console.error('Error fetching verse of the day:', error);
    return null;
  }
}

// Fetch gallery images from Sanity
export async function fetchGallery(): Promise<Gallery[]> {
  try {
    const galleryImages: SanityGallery[] = await client.fetch(GALLERY_QUERY);
    
    // Transform Sanity data to Gallery format
    return galleryImages.map(gallery => ({
      id: gallery._id,
      name: gallery.name,
      image: gallery.image 
        ? getMaxQualityImageUrl(gallery.image)
        : '',
      uploadedAt: gallery.uploadedAt,
    }));
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return [];
  }
}