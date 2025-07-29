import Navigation from "@/app/components/Navigation";
import ServerHeroSection from "@/app/components/ServerHeroSection";
import StaticHeroSection from "@/app/components/StaticHeroSection";
import React from "react";

interface HeroExamplesPageProps {
  searchParams?: { type?: string };
}

const HeroExamplesPage = ({ searchParams }: HeroExamplesPageProps) => {
  const heroType = searchParams?.type || 'server';

  return (
    <main>
      {/* Navigation with max-width */}
      <div className="mx-auto max-w-[90rem]">
        <Navigation />
      </div>
      
      {/* Hero Type Selector */}
      <div className="bg-gray-100 dark:bg-gray-800 py-4">
        <div className="container mx-auto px-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Hero Section Types:</h2>
          <div className="flex gap-4">
            <a 
              href="/examples?type=server" 
              className={`px-4 py-2 rounded ${heroType === 'server' ? 'bg-blue-500 text-white' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
            >
              Server + Client (Recommended)
            </a>
            <a 
              href="/examples?type=static" 
              className={`px-4 py-2 rounded ${heroType === 'static' ? 'bg-blue-500 text-white' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
            >
              Static Server-only
            </a>
          </div>
        </div>
      </div>
      
      {/* Render different hero types based on query parameter */}
      {heroType === 'server' && (
        <>
          <h3 className="text-center py-4 bg-blue-50 font-semibold">
            Server Component + Client Component (Full Carousel)
          </h3>
          <ServerHeroSection />
        </>
      )}
      
      {heroType === 'static' && (
        <>
          <h3 className="text-center py-4 bg-green-50 font-semibold">
            Pure Server Component (Static, First Slide Only)
          </h3>
          <StaticHeroSection />
        </>
      )}

      {/* Content sections with max-width */}
      <div className="mx-auto max-w-[90rem]">
        <section className="px-6 py-16">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Component Architecture Explanation
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 bg-blue-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-blue-800">
                  Server + Client Pattern (Recommended)
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>ServerHeroSection</strong> - Fetches data on server</li>
                  <li>• <strong>HeroSectionClient</strong> - Handles carousel/interactions</li>
                  <li>• ✅ SEO friendly (server-rendered)</li>
                  <li>• ✅ Interactive (client-side carousel)</li>
                  <li>• ✅ Fast initial load</li>
                  <li>• ✅ Hydration for interactivity</li>
                </ul>
              </div>
              
              <div className="p-6 bg-green-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-green-800">
                  Static Server Pattern
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>StaticHeroSection</strong> - Pure server component</li>
                  <li>• <strong>HeroSectionServer</strong> - Static display only</li>
                  <li>• ✅ Maximum SEO benefits</li>
                  <li>• ✅ Fastest possible load</li>
                  <li>• ✅ No JavaScript required</li>
                  <li>• ❌ No carousel/interactions</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default HeroExamplesPage;
