"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Menu, Sun, Moon, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "HOME", href: "/" },
  {
    label: "THE CHURCH",
    href: "/church",
    hasDropdown: true,
    dropdownItems: [
      { label: "Our Beliefs", href: "/beliefs" },
      { label: "Our Values", href: "/values" },
      { label: "Our Mission", href: "/mission" },
      { label: "Leadership", href: "/leadership" },
      { label: "History", href: "/history" },
    ],
  },
  { label: "GALLERY", href: "/gallery" },
  // { label: "MESSAGES", href: "/messages" },
  { label: "RESOURCES", href: "/resources" },
  { label: "EVENTS", href: "/events" },
  { label: "CONTACT", href: "/contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(
    null
  );
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  // Check if we're on the home page
  const isHomePage = pathname === "/" || pathname === "/home";

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

  const toggleMobileDropdown = (label: string) => {
    setMobileDropdownOpen(mobileDropdownOpen === label ? null : label);
  };

  // Get navigation styles based on page and scroll state
  const getNavStyles = () => {
    if (isHomePage) {
      // Home page: keep original opacity behavior
      return isScrolled
        ? "bg-theme-surface/95 backdrop-blur shadow-lg border-b border-gray-200 dark:border-gray-700"
        : "bg-white/20 dark:bg-black/20 backdrop-blur-sm border-b border-white/10 dark:border-white/10";
    } else {
      // Other pages: solid colors without opacity effects
      return "bg-theme-surface backdrop-blur shadow-lg border-b border-gray-200 dark:border-gray-700";
    }
  };

  const getTopBarStyles = () => {
    if (isHomePage) {
      // Home page: keep original opacity behavior
      return isScrolled
        ? "bg-theme-primary opacity-100"
        : "bg-theme-primary/60 opacity-80";
    } else {
      // Other pages: solid colors
      return "bg-theme-primary opacity-100";
    }
  };

  const getHelplineButtonStyles = () => {
    if (isHomePage) {
      // Home page: keep original opacity behavior
      return isScrolled
        ? "bg-theme-secondary hover:bg-yellow-400"
        : "bg-theme-secondary/90 hover:bg-yellow-400/90";
    } else {
      // Other pages: solid colors
      return "bg-theme-secondary hover:bg-yellow-400";
    }
  };

  const getLogoStyles = () => {
    if (isHomePage) {
      // Home page: keep original opacity behavior
      return isScrolled ? "opacity-100" : "opacity-95";
    } else {
      // Other pages: always full opacity
      return "opacity-100";
    }
  };

  const getNavLinkStyles = () => {
    if (isHomePage) {
      // Home page: keep original opacity behavior
      return isScrolled
        ? "hover:bg-gray-50 dark:hover:bg-gray-800 text-theme-on-surface hover:text-gray-900 dark:hover:text-gray-100"
        : "hover:bg-white/20 dark:hover:bg-black/20 text-white/90 dark:text-white/90 hover:text-white dark:hover:text-white";
    } else {
      // Other pages: solid colors
      return "hover:bg-gray-50 dark:hover:bg-gray-800 text-theme-on-surface hover:text-gray-900 dark:hover:text-gray-100";
    }
  };

  const getOfferingsButtonStyles = () => {
    if (isHomePage) {
      // Home page: keep original opacity behavior
      return isScrolled
        ? "bg-theme-primary hover:bg-gray-700 dark:hover:bg-blue-400"
        : "bg-theme-primary/50 hover:bg-theme-primary/90";
    } else {
      // Other pages: solid colors
      return "bg-theme-primary hover:bg-gray-700 dark:hover:bg-blue-400";
    }
  };

  const getMobileThemeButtonStyles = () => {
    if (isHomePage) {
      // Home page: keep original opacity behavior
      return isScrolled
        ? "text-theme-on-surface"
        : "text-white/90 dark:text-white/90";
    } else {
      // Other pages: solid colors
      return "text-theme-on-surface";
    }
  };

  const getMobileMenuButtonStyles = () => {
    if (isHomePage) {
      // Home page: keep original opacity behavior
      return isScrolled
        ? "text-theme-on-surface"
        : "text-white/90 dark:text-white/90";
    } else {
      // Other pages: solid colors
      return "text-theme-on-surface";
    }
  };

  return (
    <nav
      className={`w-full z-50 fixed top-0 left-0 right-0 min-h-fit overflow-visible transition-all duration-500 max-w-[100rem] mx-auto ${getNavStyles()}`}
    >
      {/* Top Bar - hidden on mobile, visible on desktop */}
      <div
        className={`hidden md:flex justify-between items-center px-6 py-2 text-white text-sm font-semibold overflow-hidden transition-all duration-500 ${getTopBarStyles()}`}
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

            <a href="tel:+46735675357">
              <Button
                className={`text-white cursor-pointer font-bold rounded-none px-4 py-2 transition-all duration-500 ${getHelplineButtonStyles()}`}
                size="sm"
              >
                Pastor&apos;s Helpline
              </Button>
            </a>
          </div>
        </div>
      </div>
      {/* Main Nav */}
      <div className="transition-all duration-300">
        <div className="mx-auto max-w-[90rem] flex items-center justify-between px-4 md:px-8 py-3 min-h-fit overflow-visible">
          {/* Logo & Branding */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link href={"/home"}>
              <Image
                src="/logo-rccg-sweden.png"
                alt="RCCG Sweden Logo"
                width={200}
                height={200}
                className={`w-fit max-h-16 object-contain transition-all duration-300 ${getLogoStyles()}`}
              />
            </Link>
          </div>
          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex overflow-visible">
            <NavigationMenuList className="flex gap-2">
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.label} className="flex-shrink-0">
                  {link.hasDropdown ? (
                    <>
                      <NavigationMenuTrigger
                        className={`px-3 py-2 rounded font-medium transition-all duration-500 whitespace-nowrap bg-transparent hover:bg-transparent data-[state=open]:bg-transparent ${getNavLinkStyles()}`}
                      >
                        {link.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg p-2 min-w-[200px]">
                        <ul className="space-y-1">
                          {link.dropdownItems?.map((item) => (
                            <li key={item.label}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={item.href}
                                  className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                                >
                                  {item.label}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className={`px-3 py-2 rounded font-medium transition-all duration-500 whitespace-nowrap ${getNavLinkStyles()}`}
                      prefetch={false}
                    >
                      {link.label}
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem className="flex-shrink-0">
                <Link href="/offerings">
                  <Button
                    className={`text-white font-bold ml-2 cursor-pointer px-4 py-2 whitespace-nowrap rounded-none transition-all duration-500 ${getOfferingsButtonStyles()}`}
                  >
                    OFFERINGS
                  </Button>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="sm"
              className={`text-white hover:bg-white/20 dark:hover:bg-black/20 p-2 ${getMobileThemeButtonStyles()}`}
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
                  className={`cursor-pointer transition-all duration-500 ${getMobileMenuButtonStyles()}`}
                  size="icon"
                  aria-label="Open menu"
                >
                  <Menu className="scale-150" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="p-0 w-[70%] bg-theme-surface dark:bg-gray-900 overflow-y-auto max-h-screen"
              >
                <SheetTitle className="sr-only">Main Navigation</SheetTitle>
                <SheetDescription className="sr-only">
                  Access church navigation links, prayer requests, and helpful
                  resources
                </SheetDescription>
                {/* Mobile Top Bar - matches desktop theme */}
                <div className="p-4 bg-theme-primary overflow-hidden">
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
                  <a href="tel:+46735675357">
                    <Button className="bg-theme-secondary text-white cursor-pointer font-bold mt-3 w-full rounded-none text-sm hover:bg-yellow-400">
                      Pastor&apos;s Helpline
                    </Button>
                  </a>
                </div>
                {/* Mobile Main Navigation */}
                <div className="p-4 overflow-y-auto flex-1">
                  {navLinks.map((link) => (
                    <div key={link.label}>
                      {link.hasDropdown ? (
                        <div className="space-y-1">
                          <button
                            onClick={() => toggleMobileDropdown(link.label)}
                            className="w-full flex items-center justify-between py-3 text-theme-on-surface dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 rounded px-2 transition-all duration-300 ease-in-out border-b border-gray-100 dark:border-gray-700 whitespace-nowrap transform hover:scale-[1.02] active:scale-[0.98]"
                          >
                            <span className="transition-colors duration-200">
                              {link.label}
                            </span>
                            <ChevronDown
                              className={`h-4 w-4 transition-all duration-300 ease-in-out ${
                                mobileDropdownOpen === link.label
                                  ? "rotate-180 text-blue-600 dark:text-blue-400"
                                  : "text-gray-500 dark:text-gray-400"
                              }`}
                            />
                          </button>
                          <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                              mobileDropdownOpen === link.label
                                ? "max-h-48 opacity-100"
                                : "max-h-0 opacity-0"
                            }`}
                          >
                            <div className="ml-4 space-y-1 pb-2 pt-1">
                              {link.dropdownItems?.map((item, index) => (
                                <Link
                                  key={item.label}
                                  href={item.href}
                                  className={`block py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded px-2 transition-all duration-200 ease-in-out transform hover:translate-x-1 hover:text-blue-600 dark:hover:text-blue-400`}
                                  style={{
                                    animationDelay:
                                      mobileDropdownOpen === link.label
                                        ? `${index * 50}ms`
                                        : "0ms",
                                  }}
                                  prefetch={false}
                                >
                                  {item.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={link.href}
                          className="block py-3 text-theme-on-surface dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 rounded px-2 transition-all duration-300 ease-in-out border-b border-gray-100 dark:border-gray-700 last:border-b-0 whitespace-nowrap transform hover:translate-x-1 hover:scale-[1.02]"
                          prefetch={false}
                        >
                          {link.label}
                        </Link>
                      )}
                    </div>
                  ))}
                  <Link
                    href="/offerings"
                    className="block py-3 text-theme-on-surface dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 rounded px-2 transition-all duration-300 ease-in-out border-b border-gray-100 dark:border-gray-700 last:border-b-0 whitespace-nowrap transform hover:translate-x-1 hover:scale-[1.02]"
                  >
                    OFFERINGS
                  </Link>
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
