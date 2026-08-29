import type { Metadata } from "next";
import { Fraunces, Archivo } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SmoothScroll from "@/components/SmoothScroll";
import { site } from "@/content/site";
import { featuredRelease } from "@/content/releases";

/*
  Two families only. Fraunces carries the display voice: an editorial serif with
  enough character to feel printed rather than templated, without reaching for a
  medieval face. Archivo handles every interface surface.
*/
const display = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-display",
  display: "swap",
});

const sans = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}, ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Lammoth",
    "atmospheric black metal",
    "blackgaze",
    "experimental metal",
    "Onward",
    "Asheville",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name}, ${site.tagline}`,
    description: site.description,
    url: site.url,
    images: [
      {
        url: featuredRelease.artwork,
        width: 1200,
        height: 1200,
        alt: featuredRelease.artworkAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name}, ${site.tagline}`,
    description: site.description,
    images: [featuredRelease.artwork],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: site.name,
    url: site.url,
    description: site.description,
    genre: ["Atmospheric Black Metal", "Blackgaze", "Experimental", "Electronic"],
    foundingLocation: { "@type": "Place", name: site.location },
    sameAs: [
      "https://lammothofficial.bandcamp.com",
      "https://www.instagram.com/lammoth.official/",
      "https://bsky.app/profile/lammoth.bsky.social",
      "https://ampwall.com/a/lammoth",
    ],
  };

  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll />
        <div className="grain" aria-hidden="true" />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
