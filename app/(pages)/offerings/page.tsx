'use client'

import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";

const Offerings = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [copiedSwish, setCopiedSwish] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const bankDetails = {
    bankName: "Nordea Bank",
    accountNumber: "1234 56 78901",
    accountHolder: "RCCG Sweden Karlskrona",
    swishNumber: "+46 70 123 45 67",
    iban: "SE12 3456 7890 1234 5678 9012",
    bic: "NDEASESS"
  };

  const copyToClipboard = (text: string, type: 'account' | 'swish') => {
    navigator.clipboard.writeText(text);
    if (type === 'account') {
      setCopiedAccount(true);
      setTimeout(() => setCopiedAccount(false), 2000);
    } else {
      setCopiedSwish(true);
      setTimeout(() => setCopiedSwish(false), 2000);
    }
  };

  const offeringTypes = [
    {
      title: "Tithes & Offerings",
      description: "Support the ongoing ministry and operations of our church",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      ),
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
      iconColor: "text-blue-600 dark:text-blue-400"
    },
    {
      title: "Mission Support",
      description: "Help us reach nations and plant churches worldwide",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
           <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" fill="none" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      bgColor: "bg-green-100 dark:bg-green-900/20",
      iconColor: "text-green-600 dark:text-green-400"
    },
    {
      title: "Building Fund",
      description: "Contribute to our church building and facility improvements",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
      ),
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
      iconColor: "text-purple-600 dark:text-purple-400"
    }
  ];

  return (
    <main className="max-w-[100rem] mx-auto">
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Header */}
      <section className="pt-32 pb-16 md:pt-36 md:pb-24 bg-gradient-to-br from-[rgb(var(--theme-background))] to-[rgb(var(--theme-primary)/.04)] dark:from-gray-900 dark:to-gray-800 mx-auto max-w-[100rem]">
        <div className="px-4 md:px-6">
          <div className={`text-center transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="flex justify-center mb-6">
              <div className="bg-[rgb(var(--theme-primary))] p-4 rounded-full">
                <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 4H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM6 18V6h2.5v12H6zm11.5 0h-2.5V6H18v12z"/>
                  <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                </svg>
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[rgb(var(--theme-on-surface))] mb-4 md:mb-6">
              Offerings & Donations
            </h1>
            <p className="text-[rgb(var(--theme-on-surface)/.7)] text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto px-2">
              Your generous giving helps us fulfill our mission to reach every nation for the Lord Jesus Christ
            </p>
          </div>
        </div>
      </section>

      {/* Scripture Section */}
      <section className="py-12 md:py-16 bg-[rgb(var(--theme-primary))] text-white">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <div className={`text-center transition-all duration-1000 delay-200 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <blockquote className="text-xl md:text-2xl lg:text-3xl font-medium italic leading-relaxed mb-4">
              &ldquo;Give, and it will be given to you. A good measure, pressed down, shaken together and running over, will be poured into your lap.&rdquo;
            </blockquote>
            <cite className="text-lg md:text-xl opacity-90">Luke 6:38</cite>
          </div>
        </div>
      </section>

      {/* Offering Types Section */}
      <section className="py-12 md:py-16 bg-[rgb(var(--theme-background))] dark:bg-gray-900">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className={`transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[rgb(var(--theme-on-surface))] mb-4">
                Ways to Give
              </h2>
              <p className="text-[rgb(var(--theme-on-surface)/.7)] text-lg max-w-2xl mx-auto">
                Choose how you would like to support our ministry and God&apos;s work
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mb-12">
              {offeringTypes.map((type, index) => (
                <div key={index} className="group bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 border-2 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-300 hover:shadow-md">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${type.bgColor} flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <div className={type.iconColor}>
                      {type.icon}
                    </div>
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-[rgb(var(--theme-on-surface))] mb-2">
                    {type.title}
                  </h3>
                  <p className="text-[rgb(var(--theme-on-surface)/.6)] text-xs md:text-sm leading-relaxed">
                    {type.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Payment Methods Section */}
      <section className="py-12 md:py-16 bg-[rgb(var(--theme-surface-container))] dark:bg-gray-800">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className={`transition-all duration-1000 delay-400 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[rgb(var(--theme-on-surface))] mb-4">
                How to Give
              </h2>
              <p className="text-[rgb(var(--theme-on-surface)/.7)] text-lg max-w-2xl mx-auto">
                We&apos;ve made it easy for you to give using your preferred method
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* QR Code Section */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl font-bold text-[rgb(var(--theme-on-surface))] flex items-center justify-center gap-2">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM19 13h2v2h-2zM13 13h2v2h-2zM15 15h2v2h-2zM13 17h2v2h-2zM15 19h2v2h-2zM17 17h2v2h-2zM17 13h2v2h-2zM19 15h2v2h-2z"/>
                    </svg>
                    Scan to Give
                  </CardTitle>
                  <CardDescription className="text-[rgb(var(--theme-on-surface)/.7)]">
                    Use your mobile banking app to scan and donate
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="bg-white p-6 rounded-lg shadow-inner mb-4 max-w-sm mx-auto">
                    <Image
                      src="/general.jpg" // Using placeholder image as requested
                      alt="QR Code for donations"
                      width={200}
                      height={200}
                      className="mx-auto"
                    />
                  </div>
                  <p className="text-sm text-[rgb(var(--theme-on-surface)/.6)]">
                    QR code for Swish payments
                  </p>
                </CardContent>
              </Card>

              {/* Bank Details Section */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl font-bold text-[rgb(var(--theme-on-surface))] flex items-center justify-center gap-2">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                    </svg>
                    Bank Transfer
                  </CardTitle>
                  <CardDescription className="text-[rgb(var(--theme-on-surface)/.7)]">
                    Direct bank transfer details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-[rgb(var(--theme-surface))] dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="text-sm text-[rgb(var(--theme-on-surface)/.6)]">Bank</p>
                        <p className="font-medium text-[rgb(var(--theme-on-surface))]">{bankDetails.bankName}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-[rgb(var(--theme-surface))] dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="text-sm text-[rgb(var(--theme-on-surface)/.6)]">Account Number</p>
                        <p className="font-medium text-[rgb(var(--theme-on-surface))]">{bankDetails.accountNumber}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(bankDetails.accountNumber, 'account')}
                        className="text-[rgb(var(--theme-primary))]"
                      >
                        {copiedAccount ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-[rgb(var(--theme-surface))] dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="text-sm text-[rgb(var(--theme-on-surface)/.6)]">Swish Number</p>
                        <p className="font-medium text-[rgb(var(--theme-on-surface))]">{bankDetails.swishNumber}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(bankDetails.swishNumber, 'swish')}
                        className="text-[rgb(var(--theme-primary))]"
                      >
                        {copiedSwish ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-[rgb(var(--theme-surface))] dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="text-sm text-[rgb(var(--theme-on-surface)/.6)]">Account Holder</p>
                        <p className="font-medium text-[rgb(var(--theme-on-surface))]">{bankDetails.accountHolder}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-[rgb(var(--theme-surface))] dark:bg-gray-700 rounded-lg">
                        <p className="text-sm text-[rgb(var(--theme-on-surface)/.6)]">IBAN</p>
                        <p className="font-medium text-[rgb(var(--theme-on-surface))] text-sm">{bankDetails.iban}</p>
                      </div>
                      <div className="p-3 bg-[rgb(var(--theme-surface))] dark:bg-gray-700 rounded-lg">
                        <p className="text-sm text-[rgb(var(--theme-on-surface)/.6)]">BIC</p>
                        <p className="font-medium text-[rgb(var(--theme-on-surface))]">{bankDetails.bic}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-12 md:py-16 bg-[rgb(var(--theme-background))] dark:bg-gray-900">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className={`transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[rgb(var(--theme-on-surface))] mb-4">
                Your Impact
              </h2>
              <p className="text-[rgb(var(--theme-on-surface)/.7)] text-lg max-w-2xl mx-auto">
                See how your generous giving makes a difference in our community and beyond
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
              <div className="group bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 border-2 border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300">
                <div className="w-10 h-10 md:w-12 md:h-12 mb-3 md:mb-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors duration-300">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                    <path d="M12 3l10 9h-3v8h-5v-6h-4v6H5v-8H2l10-9z" fill="none" stroke="currentColor" strokeWidth="1"/>
                  </svg>
                </div>
                <h3 className="text-base md:text-lg font-semibold text-[rgb(var(--theme-on-surface))] mb-2">Church Operations</h3>
                <p className="text-[rgb(var(--theme-on-surface)/.6)] text-xs md:text-sm leading-relaxed">
                  Supporting our weekly services, programs, and facility maintenance
                </p>
              </div>

              <div className="group bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 border-2 border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-600 transition-all duration-300">
                <div className="w-10 h-10 md:w-12 md:h-12 mb-3 md:mb-4 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center group-hover:bg-green-100 dark:group-hover:bg-green-900/30 transition-colors duration-300">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-green-600 dark:text-green-400" viewBox="0 0 24 24" fill="currentColor">
                     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" fill="none" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="text-base md:text-lg font-semibold text-[rgb(var(--theme-on-surface))] mb-2">Global Missions</h3>
                <p className="text-[rgb(var(--theme-on-surface)/.6)] text-xs md:text-sm leading-relaxed">
                  Reaching nations and planting churches in every corner of the world
                </p>
              </div>

              <div className="group bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 border-2 border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300">
                <div className="w-10 h-10 md:w-12 md:h-12 mb-3 md:mb-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg flex items-center justify-center group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 transition-colors duration-300">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-purple-600 dark:text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v-2.5c0-.83.67-1.5 1.5-1.5S10 10.67 10 11.5V18h4v-4.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V18h3v4H4v-4z"/>
                    <circle cx="9" cy="9" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <path d="M14 14.5V16h2v-1.5c0-.28-.22-.5-.5-.5s-.5.22-.5.5z" fill="none"/>
                  </svg>
                </div>
                <h3 className="text-base md:text-lg font-semibold text-[rgb(var(--theme-on-surface))] mb-2">Community Care</h3>
                <p className="text-[rgb(var(--theme-on-surface)/.6)] text-xs md:text-sm leading-relaxed">
                  Supporting local families and community outreach programs
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-12 md:py-16 bg-[rgb(var(--theme-primary))] text-white">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <div className={`text-center transition-all duration-1000 delay-600 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Thank You for Your Generosity
            </h2>
            <p className="text-lg md:text-xl leading-relaxed mb-6 opacity-90">
              Every gift, no matter the size, makes a significant impact in advancing God&apos;s kingdom. 
              Your faithful giving enables us to continue our mission of reaching every nation for Jesus Christ.
            </p>
            <p className="text-base italic opacity-80">
              &ldquo;Remember this: Whoever sows sparingly will also reap sparingly, and whoever sows generously will also reap generously.&rdquo; - 2 Corinthians 9:6
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default Offerings;
