import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { MeltdownHero } from "@/components/meltdown/MeltdownHero";
import { MeltdownTrustBar } from "@/components/meltdown/MeltdownTrustBar";
import { MeltdownComparison } from "@/components/meltdown/MeltdownComparison";
import { MeltdownFeatures } from "@/components/meltdown/MeltdownFeatures";
import { MeltdownApplications } from "@/components/meltdown/MeltdownApplications";
import { MeltdownHowToUse } from "@/components/meltdown/MeltdownHowToUse";
import { MeltdownPricing } from "@/components/meltdown/MeltdownPricing";
import { MeltdownReviews } from "@/components/meltdown/MeltdownReviews";
import { MeltdownFAQ } from "@/components/meltdown/MeltdownFAQ";
import { MeltdownCTA } from "@/components/meltdown/MeltdownCTA";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";

export const dynamic = 'force-static';

export const metadata: Metadata = {
    title: "MeltDown MR-1 | Soy-Based Asphalt Remover & Release Agent",
    description: "One drum replaces two products. MeltDown MR-1 is a high-performance, soy-based asphalt remover and release agent. Removes cured asphalt, tar, and tack oil while preventing adhesion.",
    keywords: ["MeltDown MR-1", "Soy-Based Asphalt Remover", "Asphalt Release Agent", "Asphalt Remover for Paving Equipment", "Soy Solvent Asphalt Cleaner", "Truck Bed Release Agent", "Roller Drum Release Agent", "San Antonio Asphalt Remover", "Crownwood Chemicals"],
    openGraph: {
        title: "MeltDown MR-1 | Soy-Based Asphalt Remover & Release Agent",
        description: "The only 2-in-1 soy-based asphalt remover and release agent. Removes cured asphalt, tar, and tack oil while preventing adhesion.",
        images: [{ url: "https://crownwoodchemicals.com/Meltdown.png", width: 1200, height: 630 }],
        type: "website",
    }
};

const productSchema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Product",
            "name": "MeltDown MR-1",
            "image": "https://crownwoodchemicals.com/Meltdown.png",
            "description": "High-performance, soy-based 2-in-1 asphalt remover and release agent. Removes cured asphalt, tar, and tack oil from equipment and prevents adhesion — one product, two jobs.",
            "brand": {
                "@type": "Brand",
                "name": "Crownwood Chemicals"
            },
            "category": "Asphalt Removal & Release Agents",
            "material": "Soy-based solvent blend",
            "offers": {
                "@type": "AggregateOffer",
                "url": "https://crownwoodchemicals.com/chemicals/meltdown",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "offerCount": "4",
                "lowPrice": "0",
                "seller": {
                    "@type": "Organization",
                    "name": "Crownwood Chemicals"
                }
            }
        }
    ]
};

export default function MeltdownPage() {
    // Note: The global Navbar built into the homepage doesn't automatically show here since it's not in layout.tsx
    // The design prompt asks for a custom STICKY NAVIGATION just for this page, so we use MeltdownNav.
    return (
        <main className="min-h-screen bg-[#111111] text-[#F5F3EE] flex flex-col font-sans overflow-x-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />
            <Navbar />
            <MeltdownHero />
            <MeltdownTrustBar />
            <MeltdownComparison />
            <MeltdownFeatures />
            <MeltdownApplications />
            <MeltdownHowToUse />
            <MeltdownPricing />
            <MeltdownReviews />
            <MeltdownFAQ />
            <MeltdownCTA />
            <ContactForm service="MeltDown MR-1" servicePath="/chemicals/meltdown" darkMode />
            <Footer />
        </main>
    );
}
