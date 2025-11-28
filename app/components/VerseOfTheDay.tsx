"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Verse } from '@/app/types/verse';
import { fetchVerseOfTheDay } from '@/app/sanity/queries';

// Helper function to format verse reference
const formatVerseReference = (verse: Verse): string => {
  return `${verse.book} ${verse.chapter}:${verse.verse}`;
};

const VerseOfTheDay: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentVerse, setCurrentVerse] = useState<Verse | null>(null);
  const [showCopiedFeedback, setShowCopiedFeedback] = useState(false);
  const [showFacebookCopied, setShowFacebookCopied] = useState(false);
  const [showInstagramCopied, setShowInstagramCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState<string>('');

  const loadVerseOfTheDay = async () => {
    try {
      // Set loading state to show skeleton UI
      setIsLoading(true);
      console.log(currentDate)
      
      // Fetch verse from Sanity CMS using current date as seed
      // This ensures all users see the same verse on the same day
      const verse = await fetchVerseOfTheDay();
      
      if (verse) {
        // Successfully loaded verse - update state and clear any errors
        setCurrentVerse(verse);
        setError(null);
      } else {
        // No verses found in CMS - show error message
        setError("No verses available");
      }
    } catch (err) {
      // Network or CMS error - log and show error message to user
      console.error('Error loading verse of the day:', err);
      setError("Failed to load verse");
    } finally {
      // Always stop loading and trigger animations regardless of success/failure
      setIsLoading(false);
      setIsVisible(true);
    }
  };

  useEffect(() => {
    // =================================================================
    // INITIAL SETUP - Runs once when component mounts
    // =================================================================
    
    // Load the first verse immediately when page loads
    loadVerseOfTheDay();
    
    // Set current date for tracking (used for debugging/logging)
    const today = new Date().toISOString().split('T')[0]; // Format: "2025-07-29"
    setCurrentDate(today);

    // =================================================================
    // MIDNIGHT REFRESH SYSTEM - Production Mode
    // =================================================================
    
    // Variable to store the daily interval (needed for cleanup)
    let dailyInterval: NodeJS.Timeout | null = null;

    // Calculate exact time until next midnight (12:00 AM)
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0); // Set to next midnight: 24:00:00.000
    
    // Calculate milliseconds from now until midnight
    const timeUntilMidnight = midnight.getTime() - now.getTime();
    
    console.log(`Verse will refresh in ${Math.round(timeUntilMidnight / 1000 / 60)} minutes at midnight`);

    // Set timeout to trigger at midnight
    const midnightTimeout = setTimeout(() => {
      // This runs exactly at midnight (12:00 AM)
      console.log('Midnight reached - updating verse');
      loadVerseOfTheDay();
      setCurrentDate(new Date().toISOString().split('T')[0]);
      
      // After first midnight, set up daily interval for subsequent days
      // This ensures verse updates every 24 hours at midnight
      dailyInterval = setInterval(() => {
        console.log('Daily midnight update - refreshing verse');
        loadVerseOfTheDay();
        setCurrentDate(new Date().toISOString().split('T')[0]);
      }, 24 * 60 * 60 * 1000); // 24 hours = 86,400,000 milliseconds
      
    }, timeUntilMidnight);

    // =================================================================
    // CLEANUP FUNCTION - Prevents memory leaks
    // =================================================================
    
    // This function runs when component unmounts or dependencies change
    return () => {
      // Clear the midnight timeout to prevent it from running after unmount
      clearTimeout(midnightTimeout);
      
      // Clear the daily interval if it exists
      if (dailyInterval) {
        clearInterval(dailyInterval);
      }
      
      console.log('VerseOfTheDay component cleanup completed');
    };

    /* =================================================================
     * TESTING MODE (commented out for production)
     * =================================================================
     * 
     * For testing verse changes, uncomment this section and comment out
     * the production midnight logic above. This will update verses
     * every minute instead of daily.
     * 
     * const testInterval = setInterval(() => {
     *   const testDate = new Date().toISOString().slice(0, 16); // YYYY-MM-DDTHH:MM
     *   setCurrentDate(testDate);
     *   loadVerseOfTheDay();
     *   console.log('TEST: Verse updated at:', new Date().toLocaleTimeString());
     * }, 1000 * 60); // 1 minute
     * 
     * return () => {
     *   clearInterval(testInterval);
     * };
     */
  }, []); // Empty dependency array = runs once on mount

  // Build base share text once helpers
  const buildBaseText = (v: Verse) => `"${v.text}" - ${formatVerseReference(v)}`;
  const buildInstagramText = (v: Verse) => `${buildBaseText(v)}\n\n#VerseOfTheDay #Bible #Faith #RCCG #Christianity #Inspiration #DailyVerse #Scripture #God #Jesus #BibleVerse`;

  const handleCopyVerse = async () => {
    // Only proceed if we have a verse loaded
    if (currentVerse) {
      try {
        // Format the verse text with reference for copying
  const verseText = buildBaseText(currentVerse);
        
        // Use modern Clipboard API to copy to user's clipboard
        await navigator.clipboard?.writeText(verseText);
        
        // Show green checkmark feedback for 3 seconds
        setShowCopiedFeedback(true);
        setTimeout(() => setShowCopiedFeedback(false), 3000);
        
      } catch (error) {
        // Handle clipboard errors gracefully (some browsers/contexts don't allow clipboard access)
        console.warn('Failed to copy to clipboard:', error);
        // Could optionally show an error message to user here
      }
    }
  };

  // FACEBOOK SHARE
  // We cannot programmatically create a *full* post with prefilled text beyond the quote param.
  // Using sharer.php with quote is the closest web-supported behavior analogous to tweeting.
  const handleFacebookShare = async () => {
    if (!currentVerse) return;
    const text = buildBaseText(currentVerse);
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    // Official sharer supports a quote param
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(text)}`;
    const win = window.open(shareUrl, '_blank', 'noopener,noreferrer');
    if (!win) {
      // Popup blocked fallback: copy text so user can paste
      try {
        await navigator.clipboard?.writeText(text);
        setShowFacebookCopied(true);
        setTimeout(()=>setShowFacebookCopied(false), 3000);
      } catch(e) {
        console.warn('Facebook share fallback failed', e);
      }
    }
  };

  // INSTAGRAM SHARE
  // Instagram does NOT offer a web intent like Twitter. We try Web Share API (mobile) so user can pick Instagram.
  // Fallback: copy text + open instagram.com for manual paste.
  const handleInstagramShare = async () => {
    if (!currentVerse) return;
    const text = buildInstagramText(currentVerse);
    // Try Web Share API (works on mobile to open native share sheet; user can select Instagram)
    if (navigator.share) {
      try {
        await navigator.share({ text });
        return; // success
      } catch (err) {
        // if user cancels or fails, continue to fallback
        console.warn('Web Share API failed or dismissed', err);
      }
    }
    try {
      await navigator.clipboard?.writeText(text);
      setShowInstagramCopied(true);
      setTimeout(()=>setShowInstagramCopied(false), 3000);
    } catch(e) {
      console.warn('Clipboard copy for Instagram failed', e);
    }
    // Open instagram site for user to paste (cannot prefill due to platform restrictions)
    window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer');
  };

  // Loading State
  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-br from-[rgb(var(--theme-background))] to-[rgb(var(--theme-primary)/.02)] dark:from-gray-900 dark:to-gray-800">
        <div className="mx-auto max-w-[100rem] px-6">
          <div className="max-w-4xl mx-auto text-center">
            {/* Skeleton Header */}
            <div className="mb-6">
              <div className="h-8 md:h-10 bg-[rgb(var(--theme-on-surface)/.1)] dark:bg-gray-700 rounded animate-pulse mb-3 mx-auto max-w-80"></div>
              <div className="h-4 bg-[rgb(var(--theme-on-surface)/.1)] dark:bg-gray-700 rounded animate-pulse mx-auto max-w-64"></div>
            </div>
            
            {/* Skeleton Card */}
            <Card className="bg-[rgb(var(--theme-background))] dark:bg-gray-800 border-[rgb(var(--theme-primary)/.2)] dark:border-gray-700 shadow-xl p-6 md:p-8 rounded-none">
              <div className="space-y-4">
                <div className="h-6 bg-[rgb(var(--theme-on-surface)/.1)] dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-6 bg-[rgb(var(--theme-on-surface)/.1)] dark:bg-gray-700 rounded animate-pulse w-5/6 mx-auto"></div>
                <div className="h-6 bg-[rgb(var(--theme-on-surface)/.1)] dark:bg-gray-700 rounded animate-pulse w-4/5 mx-auto"></div>
                <div className="h-6 bg-[rgb(var(--theme-on-surface)/.1)] dark:bg-gray-700 rounded animate-pulse w-3/4 mx-auto"></div>
                <div className="h-5 bg-[rgb(var(--theme-on-surface)/.1)] dark:bg-gray-700 rounded animate-pulse w-32 mx-auto mt-8"></div>
              </div>
            </Card>

            {/* Skeleton Action Buttons */}
            <div className="flex flex-wrap justify-center mt-6 gap-3">
              <div className="h-9 w-24 bg-[rgb(var(--theme-on-surface)/.1)] dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-9 w-24 bg-[rgb(var(--theme-on-surface)/.1)] dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-9 w-24 bg-[rgb(var(--theme-on-surface)/.1)] dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-9 w-24 bg-[rgb(var(--theme-on-surface)/.1)] dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error State
  if (error || !currentVerse) {
    return (
      <section className="py-16 bg-gradient-to-br from-[rgb(var(--theme-background))] to-[rgb(var(--theme-primary)/.02)] dark:from-gray-900 dark:to-gray-800">
        <div className="mx-auto max-w-[100rem] px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[rgb(var(--theme-on-surface))] mb-2">
              Verse of the Day
            </h2>
            <p className="text-[rgb(var(--theme-on-surface)/.6)] text-sm font-medium tracking-wide uppercase mb-6">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            
            <Card className="bg-[rgb(var(--theme-background))] dark:bg-gray-800 border-[rgb(var(--theme-primary)/.2)] dark:border-gray-700 shadow-xl p-6 md:p-8 rounded-none">
              <div className="text-center">
                <svg className="w-12 h-12 text-[rgb(var(--theme-on-surface)/.4)] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <h3 className="text-xl font-semibold text-[rgb(var(--theme-on-surface))] mb-2">
                  No Verse Available
                </h3>
                <p className="text-[rgb(var(--theme-on-surface)/.6)]">
                  {error || "Unable to load today's verse. Please check back later."}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-[rgb(var(--theme-background))] to-[rgb(var(--theme-primary)/.02)] dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-[100rem] px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Header with Animation */}
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-[rgb(var(--theme-on-surface))] mb-2">
              Verse of the Day
            </h2>
            <p className="text-[rgb(var(--theme-on-surface)/.6)] text-sm font-medium tracking-wide uppercase mb-6">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          
          {/* Enhanced Verse Card */}
          <div className={`transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <Card className="group relative overflow-hidden bg-[rgb(var(--theme-background))] dark:bg-gray-800 border-[rgb(var(--theme-primary)/.2)] dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all rounded-none duration-500 hover:-translate-y-1 p-6 md:p-8 cursor-default">
              {/* Subtle background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgb(var(--theme-primary))_1px,transparent_1px)] bg-[length:24px_24px]"></div>
              </div>
              
              {/* Enhanced Verse Text */}
              <div className="relative">
                <blockquote className="text-lg md:text-xl lg:text-2xl text-[rgb(var(--theme-on-surface)/.9)] dark:text-gray-100 leading-relaxed mb-6 font-light italic">
                  <span className="text-[rgb(var(--theme-primary))] text-2xl md:text-3xl leading-none">&apos;</span>
                  {currentVerse.text}
                  <span className="text-[rgb(var(--theme-primary))] text-2xl md:text-3xl leading-none">&apos;</span>
                </blockquote>

                {/* Enhanced Reference with decorative elements */}
                <div className="flex items-center justify-center">
                  <div className="h-px bg-[rgb(var(--theme-primary)/.3)] flex-1 max-w-20"></div>
                  <cite className="text-[rgb(var(--theme-primary))] dark:text-blue-400 font-bold text-lg md:text-xl mx-6 group-hover:text-[rgb(var(--theme-accent))] transition-colors duration-300">
                    — {formatVerseReference(currentVerse)}
                  </cite>
                  <div className="h-px bg-[rgb(var(--theme-primary)/.3)] flex-1 max-w-20"></div>
                </div>
              </div>
            </Card>
          </div>

          {/* Share/Save Actions */}
          <div className={`transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="flex flex-wrap justify-center mt-6 gap-3">
              <button
                onClick={handleCopyVerse}
                className="flex items-center px-4 py-2 text-[rgb(var(--theme-primary))] hover:text-[rgb(var(--theme-accent))] transition-colors duration-200 text-sm font-medium group cursor-pointer"
                aria-label="Copy verse to clipboard"
              >
                {showCopiedFeedback ? (
                  <>
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy Verse
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  const text = `"${currentVerse.text}" - ${formatVerseReference(currentVerse)}`;
                  const url = encodeURIComponent(text);
                  window.open(`https://twitter.com/intent/tweet?text=${url}`, '_blank');
                }}
                className="flex items-center px-4 py-2 text-[rgb(var(--theme-primary))] hover:text-[rgb(var(--theme-accent))] transition-colors duration-200 text-sm font-medium group cursor-pointer"
                aria-label="Share verse on Twitter"
              >
                <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                Twitter
              </button>
              <button
                onClick={handleFacebookShare}
                className="flex items-center px-4 py-2 text-[rgb(var(--theme-primary))] hover:text-[rgb(var(--theme-accent))] transition-colors duration-200 text-sm font-medium group cursor-pointer"
                aria-label="Share verse on Facebook"
              >
                {showFacebookCopied ? (
                  <>
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </>
                )}
              </button>
              <button
                onClick={handleInstagramShare}
                className="flex items-center px-4 py-2 text-[rgb(var(--theme-primary))] hover:text-[rgb(var(--theme-accent))] transition-colors duration-200 text-sm font-medium group cursor-pointer"
                aria-label="Share verse on Instagram"
              >
                {showInstagramCopied ? (
                  <>
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    Instagram
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerseOfTheDay;
