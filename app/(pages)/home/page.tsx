import Navigation from "@/app/components/Navigation";
import Hero from "@/app/components/Hero";
import CoreValues from "@/app/components/CoreValues";
import FacebookPosts from "@/app/components/FacebookPosts";
import Events from "@/app/components/Events";
import Gallery from "@/app/components/Gallery";
import VerseOfTheDay from "@/app/components/VerseOfTheDay";
import Footer from "@/app/components/Footer";
import React from "react";

const HomePage = () => {
  return (
    <main>
      {/* Navigation - Full width and sticky */}
      <Navigation />
      
      {/* Hero Section - Unified component with Sanity CMS integration */}
      {/* To shrink images by 80%, use: <Hero imageScale={0.8} /> */}
      {/* To use custom slides: <Hero staticSlides={mySlides} /> */}
      <Hero />

      {/* Content sections with max-width */}
      <div className="mx-auto max-w-[90rem]">
        {/* Core Values Section - What We Believe, Our Values, Our Priorities */}
        <CoreValues />

        {/* Facebook Posts Section - Latest social media content */}
        <FacebookPosts />
      </div>

      {/* Events Section - Upcoming Events and Ministries */}
      <Events />

      {/* Gallery Section - Church community photos in bento grid layout */}
      <Gallery />

      {/* Verse of the Day Section - Daily Bible inspiration */}
      <VerseOfTheDay />

      {/* Footer Section - Church information and links */}
      <Footer />

      {/* Content sections with max-width
      <div className="mx-auto max-w-[90rem]">
        <section className="px-6 py-16">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-rccg-blue-900 mb-6">
              Welcome to RCCG Sweden
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              We are a vibrant community of believers dedicated to worship, fellowship, and spiritual growth in Sweden.
            </p>
          </div>
        </section>
      </div> */}
    </main>
  );
};

export default HomePage;
