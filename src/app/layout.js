import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Clean, focused SEO for Loginex – no extra logos
export const metadata = {
  title: {
    template: "%s | Loginex",
    default: "Loginex – Blazing Fast VPS Hosting",
  },
  description:
    "High-performance VPS with NVMe SSD, dedicated CPU, and Pterodactyl panel. Instant deployment. Starting at $10/month.",
  keywords:
    "VPS hosting, NVMe VPS, Pterodactyl, game server, cloud server, Loginex",
  authors: [{ name: "Loginex" }],
  creator: "Loginex",
  publisher: "Loginex",

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://loginex.ca",
    siteName: "Loginex",
    title: "Loginex – Blazing Fast VPS Hosting",
    description: "NVMe-powered VPS. Instant setup. Full control.",
    images: [
      {
        url: "https://loginex.ca/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Loginex VPS Hosting",
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    site: "@LoginexHosting",
    title: "Loginex – NVMe VPS Hosting",
    description: "Instant. Powerful. Affordable.",
    images: "https://loginex.ca/og-image.jpg",
  },

  robots: {
    index: true,
    follow: true,
  },

  viewport: "width=device-width, initial-scale=1",
  themeColor: "#ffffff",

  alternates: {
    canonical: "https://loginex.ca",
  },
};

// Minimal structured data – organization only
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Loginex",
  url: "https://loginex.ca",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/logo.png" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
          <SmoothScrollProvider>
            <Navbar />
            <main className="my-32 min-h-screen">{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}