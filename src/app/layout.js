import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

// 1. Next.js Font Optimization: Ensures fonts are self-hosted and optimized
// 'display: swap' is a crucial performance setting to prevent FOIT (Flash of Invisible Text)
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

// --- ENHANCED SEO METADATA ---
const domain = "https://loginex.ca";

export const metadata = {
  // 2. metadataBase: Essential for generating absolute URLs for OpenGraph/Twitter
  metadataBase: new URL(domain),

  // Title: Keep under 60 characters for best display
  title: {
    template: "%s | Loginex VPS Hosting",
    default: "Loginex – Blazing Fast NVMe VPS Hosting & Cloud Servers",
  },

  // Description: Keep under 160 characters. Highly keyword-rich.
  description:
    "Blazing-fast VPS hosting with NVMe SSD, dedicated vCPU, and full root access. Starting at just $1.99/mo. Perfect for game servers, websites, and high-performance apps.",

  // 3. Expanded Keywords: Covering commercial and long-tail terms (Max ~10-15)
  keywords: [
    "VPS hosting",
    "NVMe VPS",
    "cheap VPS",
    "fast cloud servers",
    "dedicated vCPU VPS",
    "Pterodactyl hosting",
    "game server VPS",
    "Linux VPS",
    "Windows VPS",
    "Loginex",
    "Loginex hosting",
    "Loginex vps servers",
  ],

  authors: [{ name: "Loginex" }],
  creator: "Loginex",
  publisher: "Loginex",

  // Open Graph (OG) - For social media sharing
  openGraph: {
    type: "website",
    locale: "en_CA", // Changed to CA based on loginex.ca domain
    url: domain,
    siteName: "Loginex",
    title: "Loginex – Blazing Fast NVMe VPS & Cloud Hosting",
    description:
      "High-performance NVMe VPS with instant setup. Full root access and dedicated resources for peak speed.",
    images: [
      {
        url: "/og-image.jpg", // Use relative path since metadataBase is set
        width: 1200,
        height: 630,
        alt: "Loginex VPS Hosting - Dedicated Resources",
      },
    ],
  },

  // Twitter Card - Optimized for Twitter
  twitter: {
    card: "summary_large_image",
    site: "@LoginexHosting",
    creator: "@LoginexHosting",
    title: "Loginex – NVMe VPS Hosting. Instant. Powerful. Affordable.",
    description:
      "Experience the fastest VPS hosting with NVMe SSDs. Dedicated vCPU cores starting at $1.99/mo.",
    images: "/og-image.jpg", // Use relative path
  },

  // Robots: Standard and optimal.
  robots: {
    index: true,
    follow: true,
    // You can add /robots.txt file at the root for more detailed rules
  },

  // Viewport: Standard best practice, already correct
  viewport: "width=device-width, initial-scale=1",

  // Canonical: Crucial for SEO, already correct
  alternates: {
    canonical: domain,
  },
};

// Structured Data: Keep minimal and focused
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Loginex",
  url: domain,
  logo: `${domain}/logo.png`, // Added logo for better search visibility
  sameAs: [
    "https://twitter.com/LoginexHosting", // Add social profiles
    // Add other social media links (Facebook, LinkedIn, etc.)
  ],
};
// --- END ENHANCED SEO METADATA ---

export default function RootLayout({ children }) {
  return (
    // 4. Added font class to HTML tag for faster font loading
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* Favicon - Best practice: use /favicon.ico and /apple-touch-icon.png */}
        <link rel="icon" href="/logo.png" />

        {/* Structured Data (JSON-LD) - Placed high in <head> for faster processing */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Removed preconnect tags. next/font handles optimization. If you use external scripts, only then add preconnect. */}
      </head>

      {/* Used font variables from the HTML class for better global font control */}
      <body
        className="bg-zinc-700 font-sans" // Using font-sans which is set by geistSans.variable
      >
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        >
          {/* SmoothScrollProvider wraps all main content for consistent effect */}
          <SmoothScrollProvider>
            {/* 5. Navbar and Footer are OUTSIDE of <main> for better semantic HTML. */}
            <Navbar />
            <main className="my-32 min-h-screen">{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
