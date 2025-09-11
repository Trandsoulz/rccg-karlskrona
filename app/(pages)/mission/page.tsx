
'use client'

import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const OurMission = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main>
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Header */}
      <section className="pt-32 pb-16 md:pt-36 md:pb-24 bg-gradient-to-br from-[rgb(var(--theme-background))] to-[rgb(var(--theme-primary)/.04)] dark:from-gray-900 dark:to-gray-800 mx-auto max-w-[100rem]">
        <div className="px-4 md:px-6">
          <div className={`text-center transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[rgb(var(--theme-on-surface))] mb-4 md:mb-6">
              Our Mission
            </h1>
            <p className="text-[rgb(var(--theme-on-surface)/.7)] text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto px-2">
              Our God-given mandate to reach every nation for the Lord Jesus Christ
            </p>
          </div>
        </div>
      </section>

      {/* Mission Content Section */}
      <section className="py-12 md:py-16 bg-[rgb(var(--theme-background))] dark:bg-gray-900">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className={`transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            
            {/* Pastor Image and Complete Mission Content */}
            <div className="grid lg:grid-cols-6 gap-8 md:gap-12 items-start">
              {/* Image - Takes 3 columns */}
              <div className="relative lg:col-span-3">
                <div className="relative aspect-[4/3] rounded overflow-hidden shadow-2xl">
                  <Image
                    src="/our-mission.jpg"
                    alt="Our mission"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Complete Mission Content - Takes 2 columns */}
              <div className="space-y-4 md:space-y-6 lg:col-span-3">
                {/* Introduction */}
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-[rgb(var(--theme-on-surface)/.8)] text-sm leading-relaxed">
                    As received by the General Overseer (G.O.), Pastor E. A. Adeboye, and communicated 
                    to the Headquarters leaders, our vision and mission statement shall remain intact. They are as follows:
                  </p>
                </div>

                {/* Mission List */}
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-start gap-2 md:gap-3">
                    <div className="flex-shrink-0 w-6 h-6 md:w-7 md:h-7 bg-[rgb(var(--theme-primary))] text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <p className="text-[rgb(var(--theme-on-surface))] text-sm leading-relaxed">
                      To make heaven.
                    </p>
                  </div>

                  <div className="flex items-start gap-2 md:gap-3">
                    <div className="flex-shrink-0 w-6 h-6 md:w-7 md:h-7 bg-[rgb(var(--theme-primary))] text-white rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                    <p className="text-[rgb(var(--theme-on-surface))] text-sm leading-relaxed">
                      To take as many people with us.
                    </p>
                  </div>

                  <div className="flex items-start gap-2 md:gap-3">
                    <div className="flex-shrink-0 w-6 h-6 md:w-7 md:h-7 bg-[rgb(var(--theme-primary))] text-white rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                    <p className="text-[rgb(var(--theme-on-surface))] text-sm leading-relaxed">
                      To have a member of RCCG in every family of all nations.
                    </p>
                  </div>

                  <div className="flex items-start gap-2 md:gap-3">
                    <div className="flex-shrink-0 w-6 h-6 md:w-7 md:h-7 bg-[rgb(var(--theme-primary))] text-white rounded-full flex items-center justify-center font-bold">
                      4
                    </div>
                    <p className="text-[rgb(var(--theme-on-surface))] text-sm leading-relaxed">
                      To accomplish No. 1 above, holiness will be our lifestyle.
                    </p>
                  </div>

                  <div className="flex items-start gap-2 md:gap-3">
                    <div className="flex-shrink-0 w-6 h-6 md:w-7 md:h-7 bg-[rgb(var(--theme-primary))] text-white rounded-full flex items-center justify-center font-bold">
                      5
                    </div>
                    <p className="text-[rgb(var(--theme-on-surface))] text-sm leading-relaxed">
                      To accomplish No. 2 and 3 above, we will plant churches within five minutes 
                      walking distance in every city and town of developing countries and within 
                      five minutes driving distance in every city and town of developed countries.
                    </p>
                  </div>
                </div>

                {/* Closing Statement */}
                <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-[rgb(var(--theme-on-surface)/.2)]">
                  <p className="text-[rgb(var(--theme-on-surface))] text-sm font-medium leading-relaxed">
                    We will pursue these objectives until every Nation in the world is reached for the Lord Jesus Christ.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default OurMission;
