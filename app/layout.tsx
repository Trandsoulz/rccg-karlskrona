import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const gelion = localFont({
  src: [
    {
      path: "../public/gelion/Gelion Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/gelion/Gelion Thin Italic.ttf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../public/gelion/Gelion Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/gelion/Gelion Light Italic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/gelion/Gelion Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/gelion/Gelion Regular Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/gelion/Gelion Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/gelion/Gelion Medium Italic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/gelion/Gelion SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/gelion/Gelion SemiBold Italic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../public/gelion/Gelion Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/gelion/Gelion Bold Italic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/gelion/Gelion Black.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/gelion/Gelion Black Italic.ttf",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--font-gelion",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "RCCG Karlskrona Sweden - Redeemed Christian Church of God",
    template: "%s | RCCG Karlskrona Sweden"
  },
  description: "Welcome to RCCG Karlskrona Sweden, King's Palace Paris - A community of faith, hope, and love. Join us for worship, fellowship, and spiritual growth in Sweden.",
  keywords: ["RCCG", "Sweden", "Church", "Christian", "Worship", "Fellowship", "Faith", "Community"],
  authors: [{ name: "RCCG Karlskrona Sweden" }],
  creator: "RCCG Karlskrona Sweden",
  publisher: "RCCG Karlskrona Sweden",
  metadataBase: new URL("https://rccgkarlskrona.org"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rccgkarlskrona.org",
    title: "RCCG Karlskrona Sweden - Redeemed Christian Church of God",
    description: "Welcome to RCCG Karlskrona Sweden - A community of faith, hope, and love. Join us for worship, fellowship, and spiritual growth in Sweden.",
    siteName: "RCCG Karlskrona Sweden",
  },
  twitter: {
    card: "summary_large_image",
    title: "RCCG Karlskrona Sweden - Redeemed Christian Church of God",
    description: "Welcome to RCCG Karlskrona Sweden - A community of faith, hope, and love. Join us for worship, fellowship, and spiritual growth in Sweden.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${gelion.variable} font-sans antialiased`}
      >
        <ThemeProvider 
          attribute="class" 
          defaultTheme="light" 
          enableSystem={false}
          storageKey="rccg-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
