import type { Metadata } from "next";
import { Space_Grotesk, DM_Serif_Display, JetBrains_Mono, Bebas_Neue, Barlow_Condensed } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  weight: "400",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://crownwoodchemicals.com"),
  title: "Crownwood Chemicals | Road Products & Construction Services",
  description: "Road and soil products, PCT Fastphalt asphalt-maintenance materials, and construction services for commercial and municipal projects in Texas.",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Crownwood Chemicals",
  "url": "https://crownwoodchemicals.com",
  "description": "Supplier of road and soil products and provider of commercial and municipal construction services in Texas.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "San Antonio",
    "addressRegion": "TX",
    "addressCountry": "US"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "sales",
    "email": "nate@crownwoodchemicals.com",
    "availableLanguage": "English"
  },
  "areaServed": {
    "@type": "State",
    "name": "Texas"
  },
  "knowsAbout": [
    "Soil Stabilization",
    "Road Dust Control",
    "Pavement Preservation",
    "Pothole and Shoulder Repair",
    "Asphalt Equipment Care",
    "Asphalt Paving",
    "Commercial Sealcoating",
    "Soy-Based Asphalt Removers",
    "PM10 Dust Control",
    "Expansive Clay Treatment"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSerif.variable} ${jetbrainsMono.variable} ${bebasNeue.variable} ${barlowCondensed.variable}`}>
      <body className="antialiased selection:bg-safety-amber selection:text-asphalt">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
