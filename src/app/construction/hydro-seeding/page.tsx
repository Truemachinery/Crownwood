import { Navbar } from "@/components/Navbar";
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

            <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#4CAF50] relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000000 25%, transparent 25%, transparent 75%, #000000 75%, #000000), repeating-linear-gradient(45deg, #1A1A1A 25%, transparent 25%, transparent 75%, #1A1A1A 75%, #1A1A1A)', backgroundPosition: '0 0, 20px 20px', backgroundSize: '40px 40px' }} />

                <div className="max-w-5xl mx-auto relative z-10 text-center">
                    <h2 className="font-heading font-bold text-4xl md:text-6xl text-concrete uppercase tracking-tight mb-8">
                        Stop Using <span className="text-asphalt">Sod.</span>
                    </h2>
                    <p className="font-mono text-concrete/90 text-lg uppercase tracking-widest mb-10 max-w-2xl mx-auto">
                        Achieve SWPPP compliance and permanent erosion lock at a fraction of the cost.
                    </p>
                    <button className="bg-asphalt text-concrete px-12 py-5 rounded-full font-heading font-bold text-xl uppercase tracking-widest hover:bg-concrete hover:text-asphalt transition-colors shadow-2xl hover:scale-105 transform duration-300">
                        Schedule an Acreage Estimate
                    </button>
                </div>
            </section>

            <Footer />
        </main>
    );
}
