'use client'

import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";
import React, { useState, useEffect } from "react";

const OurValues = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const values = [
    {
      icon: "💧",
      title: "We Value The Pursuit Of God",
      description: "We thirst for His presence and to know more of Him through private and public worship, the Word and prayer.",
      scripture: "Psalm 42:1-2; 63:1-3; Matt. 5:23; Luke 6:21"
    },
    {
      icon: "✨",
      title: "We Value The Servant Leadership",
      description: "Our leaders shall serve the members of the church as Christ did selflessly and not for profit or self-glorification.",
      scripture: "Matthew 10:42; John 13:13-15; Acts 20:18-19"
    },
    {
      icon: "✝️",
      title: "We Value Christlikeness",
      description: "We want to be like the Lord and Savior in all conduct. We want to minister by serving people the way He did with compassion, under the power and anointing of the Holy Spirit. We shall convey the love, mercy and power of God through the ministry of the church.",
      scripture: "Luke 14:16-20; John 20:21; Ephesians 5:2; Colossians 3:12"
    },
    {
      icon: "💝",
      title: "We Value The Mercy Of God",
      description: "We shall always recognize in humility that all the goodness we receive from God is a result of His mercies, even those blessings we may regard as 'rights' because of our relationship with Him as children. We shall therefore seek to extend mercy to another and to all who come under the ministry of the church.",
      scripture: "Psalm 52:8; Lamentations 3:22-23; Colossians 3:12; James 5:11"
    },
    {
      icon: "🔄",
      title: "We Value Godly Family Life",
      description: "Where parents live as examples and cultivate an environment in which the spiritual, emotional and social growth of their children can be fully accomplished.",
      scripture: "Deuteronomy 6:7; Proverbs 22:6; 2 Timothy 3:15"
    },
    {
      icon: "💰",
      title: "We Value Giving",
      description: "We shall always recognize in humility that all the goodness we receive from God is a result of His mercies, even those blessings we may regard as “rights” because of our relationship with Him as children. We shall therefore seek to extend mercy to another and to all who come under the ministry of the church.",
      scripture: "Psalm 50:8; Lamentations 3:22-23; Colossians 3:12; James 5:11"
    },
    {
      icon: "🎯",
      title: "We Value Marital Fidelity",
      description: "Where husband and wife can depend on each other to provide spiritual, emotional and intimate needs.",
      scripture: "Proverbs 5:15-19; 1 Corinthians 7:3-5; Galatians 5:19-20; Hebrews 13:4"
    },
    {
      icon: "🔑",
      title: "We Value Personal And Corporate Integrity",
      description: "And therefore shall deal and conduct our affairs truthfully and honestly such that the gospel of Jesus Christ shall not suffer any reproach because of our conduct.",
      scripture: "2 Corinthians 13:8; Ephesians 4:15, 5:9, 6:14; James 5:12"
    },
    {
      icon: "👤",
      title: "We Value Purposeful Singleness",
      description: "Where the uniqueness of living single (unmarried) should be used to bless the church.",
      scripture: "Matthew 19:12; 1 Corinthians 7:32-34"
    },
    {
      icon: "💙",
      title: "We Love Unity In The Body of Christ",
      description: "We agree with the scriptures that all who believe in Jesus Christ as Lord and Savior belong to one body of Christ. We shall seek to maintain the unity with all such believers.",
      scripture: "Psalm 133:1; Romans 12:5; Ephesians 4:3-6,13"
    },
    {
      icon: "☁️",
      title: "We Value The Church Of God As The Body Of Christ",
      description: "Our desire shall be to seek its good, growth and prosperity.",
      scripture: "Matthew 16:18; Ephesians 3:9-11; 5:25-27; 1 Timothy 3:5"
    },
    {
      icon: "🌊",
      title: "We Value Simplicity",
      description: "And desire to do nothing in our private and public worship just for 'effects' and 'showing off'.",
      scripture: "Philippians 2:3; Colossians 3:17"
    },
    {
      icon: "👥",
      title: "We Value The Individual Members Of The Church",
      description: "And shall seek to treat one another with respect and appropriate courtesy irrespective of gender, social and physical status. We shall seek to help members to grow in the grace and to fully realize their God given potentials.",
      scripture: "John 13:35; Romans 12:9-10; Galatians 6:10; 1 Thessalonians 3:12; Colossians 3:12-14"
    },
    {
      icon: "⚖️",
      title: "We Value Modesty In Our Lifestyle",
      description: "We shall seek to be generous and gracious in our speech, firm in our convictions and chaste in our dressing.",
      scripture: "Galatians 5:26; Philippians 2:3; 1 Timothy 4:14; 1 Peter 3:3-4; 1 John 2:15-17"
    }
  ];

  return (
    <main>
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Header */}
      <section className="pt-32 pb-16 md:pt-36 md:pb-24 bg-gradient-to-br from-[rgb(var(--theme-background))] to-[rgb(var(--theme-primary)/.04)] dark:from-gray-900 dark:to-gray-800 mx-auto max-w-[100rem]">
        <div className="px-4 md:px-6">
          <div className={`text-center transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[rgb(var(--theme-on-surface))] mb-4 md:mb-6">
              Our Values
            </h1>
            <p className="text-[rgb(var(--theme-on-surface)/.7)] text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto px-2">
              The foundational principles that guide our church community and spiritual journey
            </p>
          </div>
        </div>
      </section>

      {/* Values Grid Section */}
      <section className="py-12 md:py-16 bg-[rgb(var(--theme-surface))] dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className={`transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            
            {/* Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className="bg-[rgb(var(--theme-background))] dark:bg-gray-900 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-[rgb(var(--theme-on-surface)/.1)] flex flex-col justify-center items-center text-center min-h-[300px]"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {/* Title */}
                  <h3 className="text-lg font-light md:text-xl text-[rgb(var(--theme-on-surface))] mb-4 text-center">
                    {value.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-[rgb(var(--theme-on-surface)/.8)] text-sm leading-relaxed mb-6 text-center">
                    {value.description}
                  </p>
                  
                  {/* Scripture Reference */}
                  <div className="text-center">
                    <span className="inline-block px-3 py-1 bg-[rgb(var(--theme-primary)/.1)] text-[rgb(var(--theme-primary))] rounded text-xs font-medium">
                      {value.scripture}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Closing Statement Section */}
      <section className="py-12 md:py-16 bg-[rgb(var(--theme-background))] dark:bg-gray-900">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <div className={`transition-all duration-1000 delay-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="text-center bg-[rgb(var(--theme-primary)/.05)] dark:bg-gray-800 rounded-lg p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[rgb(var(--theme-on-surface))] mb-6">
                Living Our Values
              </h2>
              <p className="text-[rgb(var(--theme-on-surface)/.8)] text-base md:text-lg leading-relaxed mb-6">
                These values are not just words on a page—they are the foundation of our community life. 
                We invite you to join us in living out these principles as we grow together in faith, 
                love, and service to God and one another.
              </p>
              <p className="text-[rgb(var(--theme-primary))] font-semibold text-lg">
                &quot;Let us hold fast the confession of our hope without wavering, for He who promised is faithful.&quot;
              </p>
              <p className="text-[rgb(var(--theme-on-surface)/.6)] text-sm mt-2">
                - Hebrews 10:23
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default OurValues;
