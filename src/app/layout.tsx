import type { Metadata } from "next";
import { Space_Grotesk, DM_Serif_Display, JetBrains_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://crownwoodchemicals.com"),
  title: "Crownwood Chemicals | Polymer Soil Stabilization & Industrial Construction",
  description: "Crownwood Chemicals manufactures polymer bio-enzyme soil stabilizers, dust control chemicals, and provides heavy construction services including asphalt, concrete, sealcoat, and land clearing across Texas.",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Crownwood Chemicals",
  "url": "https://crownwoodchemicals.com",
  "description": "Manufacturer of polymer soil stabilization chemicals and provider of heavy construction services in Texas.",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "sales",
    "availableLanguage": "English"
  },
  "areaServed": {
    "@type": "State",
    "name": "Texas"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSerif.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased selection:bg-safety-amber selection:text-asphalt">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <svg className="noise-overlay" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
        {children}
      </body>
    </html>
  );
}
