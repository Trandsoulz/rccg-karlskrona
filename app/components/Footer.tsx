"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Youtube,
  Instagram,
} from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="mx-auto max-w-[100rem] px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Church Identity */}
          <div className="lg:col-span-2">
            <div className="flex md:flex-row flex-col md:items-center gap-3 mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  RCCG King&apos;s Palace Parish
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  The Redeemed Christian Church of God
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4 max-w-md">
              A vibrant community of believers dedicated to worship, fellowship,
              and spiritual growth across Sweden. We are committed to spreading
              the Gospel and building God&apos;s kingdom.
            </p>

            {/* Social Media Links */}
            <div className="flex gap-3">
              <Link
                href="https://web.facebook.com/rccg.karlskrona"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm" className="p-2">
                  <Facebook className="h-4 w-4" />
                  <span className="sr-only">Facebook</span>
                </Button>
              </Link>
              <Link
                href="https://www.youtube.com/@rccgkarlskronasweden2467"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm" className="p-2">
                  <Youtube className="h-4 w-4" />
                  <span className="sr-only">YouTube</span>
                </Button>
              </Link>
              <Link
                href="https://www.instagram.com/rccgkarlskrona.se/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm" className="p-2">
                  <Instagram className="h-4 w-4" />
                  <span className="sr-only">Instagram</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4 uppercase tracking-wide">
              Quick Links
            </h4>
            <nav className="space-y-2">
              <Link
                href="/church"
                className="block text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
              >
                About The Church
              </Link>
              <Link
                href="/parishes"
                className="block text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
              >
                Find a Parish
              </Link>
              <Link
                href="/events"
                className="block text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
              >
                Events
              </Link>
              <Link
                href="/resources"
                className="block text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
              >
                Resources
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4 uppercase tracking-wide">
              Contact
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-slate-500 dark:text-slate-400 mt-0.5 flex-shrink-0" />
                <a
                  href="https://maps.app.goo.gl/tUuzjxY1gxW12TYr6?g_st=ipc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
                >
                  Karlskrona, Sweden
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-slate-500 dark:text-slate-400 flex-shrink-0" />
                <a
                  href="mailto:pastor@rccgkarlskona.org"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
                >
                  pastor@rccgkarlskona.org
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-slate-500 dark:text-slate-400 flex-shrink-0" />
                <a
                  href="tel:+46704806322"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
                >
                  +46 70 480 6322
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent mb-6"></div>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm text-slate-600 dark:text-slate-400">
          <span className="text-center">
            © {currentYear} RCCG King&apos;s Palace Parish
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="text-center italic">
            &quot;Jesus Christ the same yesterday, and today, and forever.&quot;
            - Hebrews 13:8
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
