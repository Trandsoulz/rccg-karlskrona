'use client'

import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const contactInfo = {
    address: "Högabergsgatan 5, 371 34 Karlskrona, Sweden",
    phone: "+46 70 123 45 67",
    email: "info@rccgkarlskrona.se",
    pastor: "Pastor John Doe",
    serviceTime: "Sunday 10:00 AM",
    prayerMeeting: "Wednesday 7:00 PM"
  };

  const copyToClipboard = (text: string, type: 'phone' | 'email') => {
    navigator.clipboard.writeText(text);
    if (type === 'phone') {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } else {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const contactMethods = [
    {
      title: "Visit Us",
      description: "Join us for Sunday service and experience God's presence",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
      ),
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
      iconColor: "text-blue-600 dark:text-blue-400"
    },
    {
      title: "Call Us",
      description: "Speak directly with our ministry team for prayer and support",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
      ),
      bgColor: "bg-green-100 dark:bg-green-900/20",
      iconColor: "text-green-600 dark:text-green-400"
    },
    {
      title: "Email Us",
      description: "Send us your prayer requests and questions anytime",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
      iconColor: "text-purple-600 dark:text-purple-400"
    }
  ];

  const serviceSchedule = [
    {
      title: "Sunday Service",
      time: "10:00 AM - 12:00 PM",
      description: "Main worship service with preaching and communion",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      )
    },
    {
      title: "Prayer Meeting",
      time: "Wednesday 7:00 PM",
      description: "Mid-week prayer and Bible study",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
        </svg>
      )
    },
    {
      title: "Youth Service",
      time: "Saturday 6:00 PM",
      description: "Special service for young people and teenagers",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v-2.5c0-.83.67-1.5 1.5-1.5S10 10.67 10 11.5V18h4v-4.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V18h3v4H4v-4z"/>
        </svg>
      )
    }
  ];

  return (
    <main className="mx-auto max-w-[100rem]">
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Header */}
      <section className="pt-32 pb-16 md:pt-36 md:pb-24 bg-gradient-to-br from-[rgb(var(--theme-background))] to-[rgb(var(--theme-primary)/.04)] dark:from-gray-900 dark:to-gray-800 mx-auto max-w-[100rem]">
        <div className="px-4 md:px-6">
          <div className={`text-center transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="flex justify-center mb-6">
              <div className="bg-[rgb(var(--theme-primary))] p-4 rounded-full">
                <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[rgb(var(--theme-on-surface))] mb-4 md:mb-6">
              Contact Us
            </h1>
            <p className="text-[rgb(var(--theme-on-surface)/.7)] text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto px-2">
              We'd love to hear from you. Reach out to us for prayer, questions, or to connect with our church family
            </p>
          </div>
        </div>
      </section>

      {/* Ways to Contact Section */}
      <section className="py-12 md:py-16 bg-[rgb(var(--theme-background))] dark:bg-gray-900">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className={`transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[rgb(var(--theme-on-surface))] mb-4">
                Ways to Connect
              </h2>
              <p className="text-[rgb(var(--theme-on-surface)/.7)] text-lg max-w-2xl mx-auto">
                Choose the best way to reach out to us
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mb-12">
              {contactMethods.map((method, index) => (
                <div key={index} className="group bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 border-2 border-gray-200 dark:border-gray-600 hover:border-[rgb(var(--theme-primary))] dark:hover:border-[rgb(var(--theme-primary))] transition-all duration-300 hover:shadow-md">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-[rgb(var(--theme-primary)/.1)] dark:bg-[rgb(var(--theme-primary)/.2)] flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 group-hover:bg-[rgb(var(--theme-primary)/.2)] dark:group-hover:bg-[rgb(var(--theme-primary)/.3)] transition-all duration-300">
                    <div className="text-[rgb(var(--theme-primary))]">
                      {method.icon}
                    </div>
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-[rgb(var(--theme-on-surface))] mb-2">
                    {method.title}
                  </h3>
                  <p className="text-[rgb(var(--theme-on-surface)/.6)] text-xs md:text-sm leading-relaxed">
                    {method.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Details & Map Section */}
      <section className="py-12 md:py-16 bg-[rgb(var(--theme-surface-container))] dark:bg-gray-800">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className={`transition-all duration-1000 delay-400 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Contact Information */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-[rgb(var(--theme-on-surface))] flex items-center gap-2">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    Get in Touch
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="p-4 bg-[rgb(var(--theme-surface))] dark:bg-gray-700 rounded-lg">
                      <p className="text-sm text-[rgb(var(--theme-on-surface)/.6)] mb-1">Church Address</p>
                      <p className="font-medium text-[rgb(var(--theme-on-surface))]">{contactInfo.address}</p>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-[rgb(var(--theme-surface))] dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="text-sm text-[rgb(var(--theme-on-surface)/.6)] mb-1">Phone Number</p>
                        <p className="font-medium text-[rgb(var(--theme-on-surface))]">{contactInfo.phone}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(contactInfo.phone, 'phone')}
                        className="text-[rgb(var(--theme-primary))]"
                      >
                        {copiedPhone ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-[rgb(var(--theme-surface))] dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="text-sm text-[rgb(var(--theme-on-surface)/.6)] mb-1">Email Address</p>
                        <p className="font-medium text-[rgb(var(--theme-on-surface))]">{contactInfo.email}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(contactInfo.email, 'email')}
                        className="text-[rgb(var(--theme-primary))]"
                      >
                        {copiedEmail ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Google Map */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-[rgb(var(--theme-on-surface))] flex items-center gap-2">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    Find Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2187.123456789!2d15.587123456789!3d56.161234567890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46566c5371262875%3A0x882661f22b2334fe!2sThe%20Redeemed%20Christian%20Church%20Of%20God%20King's%20Palace!5e0!3m2!1sen!2sse!4v1234567890123!5m2!1sen!2sse"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="RCCG King's Palace Karlskrona Location"
                    />
                  </div>
                  <div className="mt-4">
                    <Button
                      className="w-full bg-[rgb(var(--theme-primary))] hover:bg-[rgb(var(--theme-primary)/.9)] text-white"
                      onClick={() => window.open('https://www.google.com/maps?q=The+Redeemed+Christian+Church+Of+God+King%27s+Palace,+H%C3%B6gabergsgatan+5,+371+34+Karlskrona,+Sweden', '_blank')}
                    >
                      Open in Google Maps
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Service Schedule Section */}
      <section className="py-12 md:py-16 bg-[rgb(var(--theme-background))] dark:bg-gray-900">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className={`transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[rgb(var(--theme-on-surface))] mb-4">
                Service Schedule
              </h2>
              <p className="text-[rgb(var(--theme-on-surface)/.7)] text-lg max-w-2xl mx-auto">
                Join us for worship, prayer, and fellowship
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
              {serviceSchedule.map((service, index) => (
                <div key={index} className="group bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 border-2 border-gray-200 dark:border-gray-600 hover:border-[rgb(var(--theme-primary))] dark:hover:border-[rgb(var(--theme-primary))] transition-all duration-300">
                  <div className="w-10 h-10 md:w-12 md:h-12 mb-3 md:mb-4 bg-[rgb(var(--theme-primary)/.1)] dark:bg-[rgb(var(--theme-primary)/.2)] rounded-lg flex items-center justify-center group-hover:bg-[rgb(var(--theme-primary)/.2)] dark:group-hover:bg-[rgb(var(--theme-primary)/.3)] transition-colors duration-300">
                    <div className="text-[rgb(var(--theme-primary))]">
                      {service.icon}
                    </div>
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-[rgb(var(--theme-on-surface))] mb-1">
                    {service.title}
                  </h3>
                  <p className="text-[rgb(var(--theme-primary))] font-medium text-sm md:text-base mb-2">
                    {service.time}
                  </p>
                  <p className="text-[rgb(var(--theme-on-surface)/.6)] text-xs md:text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-12 md:py-16 bg-[rgb(var(--theme-primary))] text-white">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <div className={`text-center transition-all duration-1000 delay-600 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              We Look Forward to Hearing from You
            </h2>
            <p className="text-lg md:text-xl leading-relaxed mb-6 opacity-90">
              Whether you're seeking prayer, have questions about faith, or want to join our church family, 
              we're here for you. God has a plan for your life, and we'd love to be part of your journey.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default Contact;
