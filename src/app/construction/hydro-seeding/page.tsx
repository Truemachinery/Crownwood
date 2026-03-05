import { Navbar } from "@/components/Navbar";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { HydroSeedingHero } from "@/components/HydroSeedingHero";
import { HydroSeedingCapabilities } from "@/components/HydroSeedingCapabilities";
import { HydroSeedingProcess } from "@/components/HydroSeedingProcess";
import { HydroSeedingServicesList } from "@/components/HydroSeedingServicesList";
import { HydroSeedingFAQ } from "@/components/HydroSeedingFAQ";
import { HydroSeedingGallery } from "@/components/HydroSeedingGallery";
import { Metadata } from "next";

export const dynamic = 'force-static';

export const metadata: Metadata = {
    title: "Commercial Hydro Seeding Services | San Antonio, TX | Crownwood",
    description: "Rapid, cost-effective commercial hydro seeding and erosion control in San Antonio. Specialized slurries for retention ponds, TXDOT right-of-ways, and SWPPP compliance.",
    keywords: ["Hydro Seeding San Antonio", "Commercial Erosion Control", "Retention Pond Seeding", "SWPPP Compliance Bexar County", "TXDOT Right of Way Revegetation", "Slurry Grass Seeding"],
    openGraph: {
        title: "Commercial Hydro Seeding & Erosion Control",
        description: "High-pressure slurry applications for massive commercial footprints. Cheaper than sod, better root establishment.",
        images: [{ url: "https://new.tmlabz.com/images/hydro-seeding-hero.png", width: 1200, height: 630 }],
    }
};

export default function HydroSeedingPage() {
    const serviceSchema = {
        "@context": "https://schema.org/",
        "@type": "Service",
        "serviceType": "Commercial Hydro Seeding and Erosion Control",
        "provider": {
            "@type": "LocalBusiness",
            "name": "Crownwood Chemicals",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "San Antonio",
                "addressRegion": "TX"
            }
        },
        "areaServed": "San Antonio Metropolitan Area",
        "description": "Large-scale commercial hydro-seeding application involving custom slurries, Bonded Fiber Matrix (BFM), and native seed blends for SWPPP compliance and rapid erosion control.",
        "offers": {
            "@type": "Offer",
            "url": "https://new.tmlabz.com/construction/hydro-seeding",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
        }
    };

    return (
        <main className="relative flex min-h-screen flex-col bg-concrete overflow-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <Navbar />
            <HydroSeedingHero />
            <HydroSeedingCapabilities />
            <HydroSeedingProcess />
            <HydroSeedingGallery />
            <HydroSeedingServicesList />
            <HydroSeedingFAQ />

            {/* Contact Form */}
            <section className="py-24 px-6 md:px-12 lg:px-24 bg-concrete relative">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="font-heading font-bold text-4xl md:text-5xl text-industrial uppercase tracking-tight mb-4">
                            Request A <span className="text-safety-amber">Seeding Estimate</span>
                        </h2>
                        <p className="font-mono text-industrial/50 text-sm uppercase tracking-widest">
                            Achieve SWPPP compliance at a fraction of sod costs
                        </p>
                    </div>
                    <ContactForm
                        service="Hydro Seeding & Erosion Control"
                        servicePath="/construction/hydro-seeding"
                    />
                </div>
            </section>

            <Footer />
        </main>
    );
}
