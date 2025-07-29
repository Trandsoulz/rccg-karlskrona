"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu, Sun, Moon } from "lucide-react";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "THE CHURCH", href: "/church" },
  { label: "PARISHES", href: "/parishes" },
  { label: "RESOURCES", href: "/resources" },
  { label: "2025 CALENDAR", href: "/calendar" },
  { label: "CONTACT", href: "/contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav
      className={`w-full z-50 fixed top-0 left-0 right-0 min-h-fit overflow-visible transition-all duration-500 max-w-[90rem] mx-auto ${
        isScrolled
          ? "bg-theme-surface/95 backdrop-blur shadow-lg border-b border-gray-200 dark:border-gray-700"
          : "bg-white/20 dark:bg-black/20 backdrop-blur-sm border-b border-white/10 dark:border-white/10"
      }`}
    >
      {/* Top Bar - hidden on mobile, visible on desktop */}
      <div
        className={`hidden md:flex justify-between items-center px-6 py-2 text-white text-sm font-semibold overflow-hidden transition-all duration-500 ${
          isScrolled
            ? "bg-theme-primary opacity-100"
            : "bg-theme-primary/60 opacity-80"
        }`}
      >
        <div className="mx-auto max-w-[90rem] w-full flex justify-between items-center">
          <div className="flex gap-6">
            <a
              href="#prayer"
              className="hover:underline transition-colors cursor-pointer whitespace-nowrap"
            >
              Prayer Request
            </a>
            <a
              href="https://www.rccg.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline transition-colors cursor-pointer whitespace-nowrap"
            >
              RCCG Worldwide
            </a>
            <a
              href="#beliefs"
              className="hover:underline transition-colors cursor-pointer whitespace-nowrap"
            >
              Our Beliefs
            </a>
          </div>
          <div className="space-x-4">
            {/* Theme Toggle Button */}
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 dark:hover:bg-black/20 p-2 "
              aria-label="Toggle theme"
            >
              {!mounted ? (
                <Sun className="h-4 w-4" />
              ) : theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            <Button
              className={`text-white cursor-pointer font-bold rounded-none px-4 py-2 transition-all duration-500 ${
                isScrolled
                  ? "bg-theme-secondary hover:bg-yellow-400"
                  : "bg-theme-secondary/90 hover:bg-yellow-400/90"
              }`}
              size="sm"
            >
              Pastor&apos;s Helpline
            </Button>
          </div>
        </div>
      </div>
      {/* Main Nav */}
      <div className="transition-all duration-300">
        <div className="mx-auto max-w-[90rem] flex items-center justify-between px-4 md:px-8 py-3 min-h-fit overflow-visible">
          {/* Logo & Branding */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Image
              src="/logo-rccg-sweden.png"
              alt="RCCG Sweden Logo"
              width={200}
              height={200}
              className={`w-fit max-h-16 object-contain transition-all duration-300 ${
                isScrolled ? "opacity-100" : "opacity-95"
              }`}
            />
          </div>
          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex overflow-visible">
            <NavigationMenuList className="flex gap-2">
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.label} className="flex-shrink-0">
                  <Link
                    href={link.href}
                    className={`px-3 py-2 rounded font-medium transition-all duration-500 whitespace-nowrap ${
                      isScrolled
                        ? "hover:bg-gray-50 dark:hover:bg-gray-800 text-theme-on-surface hover:text-gray-900 dark:hover:text-gray-100"
                        : "hover:bg-white/20 dark:hover:bg-black/20 text-white/90 dark:text-white/90 hover:text-white dark:hover:text-white"
                    }`}
                    prefetch={false}
                  >
                    {link.label}
                  </Link>
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem className="flex-shrink-0">
                <Button
                  className={`text-white font-bold ml-2 cursor-pointer px-4 py-2 whitespace-nowrap rounded-none transition-all duration-500 ${
                    isScrolled
                      ? "bg-theme-primary hover:bg-gray-700 dark:hover:bg-blue-400"
                      : "bg-theme-primary/50 hover:bg-theme-primary/90"
                  }`}
                >
                  DONATE
                </Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="sm"
              className={`text-white hover:bg-white/20 dark:hover:bg-black/20 p-2 ${isScrolled
                      ? "text-theme-on-surface"
                      : "text-white/90 dark:text-white/90"}`}
              aria-label="Toggle theme"
            >
              {!mounted ? (
                <Sun className="h-6 w-6" />
              ) : theme === "dark" ? (
                <Sun className="h-6 w-6" />
              ) : (
                <Moon className="h-6 w-6" />
              )}
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className={`cursor-pointer transition-all duration-500 ${
                    isScrolled
                      ? "text-theme-on-surface"
                      : "text-white/90 dark:text-white/90"
                  }`}
                  size="icon"
                  aria-label="Open menu"
                >
                  <Menu className="scale-150" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="p-0 w-[70%] bg-white dark:bg-gray-900 overflow-y-auto max-h-screen"
              >
                <SheetTitle className="sr-only">Main Navigation</SheetTitle>
                {/* Mobile Top Bar - always blue */}
                <div className="p-4 bg-blue-700 overflow-hidden">
                  <div className="flex items-center gap-3 mb-4">
                    <Image
                      src="/logo-rccg-sweden.png"
                      alt="RCCG Sweden Logo"
                      width={200}
                      height={200}
                      className="w-fit flex-shrink-0 max-h-24 object-contain"
                    />
                  </div>
                  <a
                    href="#prayer"
                    className="block py-2 hover:underline transition-colors text-sm font-semibold text-white"
                  >
                    Prayer Request
                  </a>
                  <a
                    href="https://www.rccg.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-2 hover:underline transition-colors text-sm font-semibold text-white"
                  >
                    RCCG Worldwide
                  </a>
                  <a
                    href="#beliefs"
                    className="block py-2 hover:underline transition-colors text-sm font-semibold text-white"
                  >
                    Our Beliefs
                  </a>
                  <Button className="bg-yellow-500 text-white cursor-pointer font-bold mt-3 w-full rounded-none text-sm hover:bg-yellow-400">
                    Pastor&apos;s Helpline
                  </Button>
                </div>
                {/* Mobile Main Navigation */}
                <div className="p-4 overflow-y-auto flex-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="block py-3 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 rounded px-2 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0 whitespace-nowrap"
                      prefetch={false}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Button className="bg-gray-600 text-white cursor-pointer font-bold mt-4 w-full hover:bg-gray-700 whitespace-nowrap rounded-none">
                    DONATE
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
