'use client'

import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const quickLinks = [
    {
      title: "Home",
      description: "Return to our homepage",
      href: "/",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
      )
    },
    {
      title: "Contact Us",
      description: "Get in touch with our church",
      href: "/contact",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      )
    },
    {
      title: "Events",
      description: "See our upcoming events",
      href: "/events",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
        </svg>
      )
    },
    {
      title: "Our Mission",
      description: "Learn about our purpose",
      href: "/mission",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      )
    }
  ];

  return (
    <main className="mx-auto max-w-[100rem]">
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Header */}
      <section className="pt-32 pb-16 md:pt-36 md:pb-24 bg-gradient-to-br from-[rgb(var(--theme-background))] to-[rgb(var(--theme-primary)/.04)] dark:from-gray-900 dark:to-gray-800 mx-auto max-w-[100rem] min-h-[60vh] flex items-center">
        <div className="px-4 md:px-6 w-full">
          <div className={`text-center transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="flex justify-center mb-6">
              <div className="bg-[rgb(var(--theme-primary))] p-6 rounded-full">
                <svg className="w-16 h-16 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
              </div>
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-[rgb(var(--theme-primary))] mb-4 md:mb-6">
              404
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[rgb(var(--theme-on-surface))] mb-4 md:mb-6">
              Page Not Found
            </h2>
            <p className="text-[rgb(var(--theme-on-surface)/.7)] text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto px-2 mb-8">
              We couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/">
                <Button className="bg-[rgb(var(--theme-primary))] hover:bg-[rgb(var(--theme-primary)/.9)] text-white px-8 py-3 text-lg w-48 h-12">
                  Go to Homepage
                </Button>
              </Link>
              <Button 
                variant="outline" 
                onClick={() => window.history.back()}
                className="border-[rgb(var(--theme-primary))] text-[rgb(var(--theme-primary))] hover:bg-[rgb(var(--theme-primary))] hover:text-white px-8 py-3 text-lg w-48 h-12"
              >
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-12 md:py-16 bg-[rgb(var(--theme-background))] dark:bg-gray-900">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className={`transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[rgb(var(--theme-on-surface))] mb-4">
                Popular Pages
              </h2>
              <p className="text-[rgb(var(--theme-on-surface)/.7)] text-lg max-w-2xl mx-auto">
                Here are some pages you might be looking for
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {quickLinks.map((link, index) => (
                <Link key={index} href={link.href}>
                  <div className="group bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 border-2 border-gray-200 dark:border-gray-600 hover:border-[rgb(var(--theme-primary))] dark:hover:border-[rgb(var(--theme-primary))] transition-all duration-300 hover:shadow-md cursor-pointer min-h-[128px] md:min-h-[160px] flex flex-col justify-between">
                    <div className="flex flex-col flex-1">
                      <div className="w-10 h-10 md:w-12 md:h-12 mb-3 bg-[rgb(var(--theme-primary)/.1)] dark:bg-[rgb(var(--theme-primary)/.2)] rounded-lg flex items-center justify-center group-hover:bg-[rgb(var(--theme-primary)/.2)] dark:group-hover:bg-[rgb(var(--theme-primary)/.3)] transition-colors duration-300 flex-shrink-0">
                        <div className="text-[rgb(var(--theme-primary))]">
                          {link.icon}
                        </div>
                      </div>
                      <h3 className="text-sm md:text-base font-semibold text-[rgb(var(--theme-on-surface))] mb-2 line-clamp-2">
                        {link.title}
                      </h3>
                    </div>
                    <p className="text-[rgb(var(--theme-on-surface)/.6)] text-xs md:text-sm leading-relaxed line-clamp-2">
                      {link.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-12 md:py-16 bg-[rgb(var(--theme-surface-container))] dark:bg-gray-800">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <div className={`text-center transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 border-2 border-gray-200 dark:border-gray-600">
              <div className="w-16 h-16 mx-auto mb-6 bg-[rgb(var(--theme-primary)/.1)] dark:bg-[rgb(var(--theme-primary)/.2)] rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-[rgb(var(--theme-primary))]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[rgb(var(--theme-on-surface))] mb-4">
                Need Help?
              </h3>
              <p className="text-[rgb(var(--theme-on-surface)/.7)] text-base md:text-lg leading-relaxed mb-6">
                If you can't find what you're looking for, our team is here to help. 
                Feel free to contact us with any questions or concerns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button className="bg-[rgb(var(--theme-primary))] hover:bg-[rgb(var(--theme-primary)/.9)] text-white px-6 py-2">
                    Contact Us
                  </Button>
                </Link>
                <a href="tel:+46735675357">
                  <Button variant="outline" className="border-[rgb(var(--theme-primary))] text-[rgb(var(--theme-primary))] hover:bg-[rgb(var(--theme-primary))] hover:text-white px-6 py-2">
                    Call Us Now
                  </Button>
                </a>
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

export default NotFound;
