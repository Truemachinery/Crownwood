import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PhpmHero } from "@/components/PhpmHero";
import { PhpmFeatures } from "@/components/PhpmFeatures";
import { PhpmProcess } from "@/components/PhpmProcess";
import { PhpmFAQ } from "@/components/PhpmFAQ";
import { Metadata } from "next";

export const dynamic = 'force-static';

export const metadata: Metadata = {
    title: "PHPM-50™ High Performance Pothole Patch | Crownwood Chemicals",
    description: "Commercial-grade, hydro-reactive pothole repair polymer that cures permanently in standing water and extreme Texas temperatures. Zero setup downtime.",
    keywords: ["PHPM-50 Pothole Patch", "Commercial Pothole Repair", "Hydro-Reactive Asphalt Patch", "Cold Patch Alternative", "Permanent Pothole Fix", "San Antonio Asphalt Repair", "Municipal Pothole Mitigation"],
    openGraph: {
        title: "PHPM-50™ | High Performance Hydro-Reactive Pothole Patch",
        description: "Commercial-grade pothole patch that cures permanently in standing water.",
        images: [{ url: "https://new.tmlabz.com/images/phpm-hero.png", width: 1200, height: 630 }],
    }
};

export default function PhpmPage() {
    const productSchema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": "PHPM-50™ High Performance Pothole Patch",
        "image": "https://new.tmlabz.com/images/phpm-hero.png",
        "description": "Commercial-grade, hydro-reactive pothole repair polymer that cures permanently in standing water and extreme temperatures. Zero setup downtime.",
        "brand": {
            "@type": "Brand",
            "name": "Crownwood Chemicals"
        },
        "category": "Construction Chemicals",
        "offers": {
            "@type": "Offer",
            "url": "https://new.tmlabz.com/chemicals/phpm-50",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "seller": {
                "@type": "Organization",
                "name": "Crownwood Chemicals"
            }
        }
    };

    return (
        <main className="relative flex min-h-screen flex-col bg-concrete overflow-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />
            <Navbar />
            <PhpmHero />
            <PhpmFeatures />
            <PhpmProcess />
            <PhpmFAQ />

            <section className="py-24 px-6 md:px-12 lg:px-24 bg-asphalt relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000000 25%, transparent 25%, transparent 75%, #000000 75%, #000000), repeating-linear-gradient(45deg, #1A1A1A 25%, transparent 25%, transparent 75%, #1A1A1A 75%, #1A1A1A)', backgroundPosition: '0 0, 20px 20px', backgroundSize: '40px 40px' }} />

                <div className="max-w-5xl mx-auto relative z-10 text-center">
                    <h2 className="font-heading font-bold text-4xl md:text-6xl text-concrete uppercase tracking-tight mb-8">
                        Stop Patching <span className="text-high-vis-yellow">Twice.</span>
                    </h2>
                    <p className="font-mono text-concrete/80 text-lg uppercase tracking-widest mb-10 max-w-2xl mx-auto">
                        Equip your maintenance crews with the only pothole patch engineered for extreme Texas conditions.
                    </p>
                    <button className="bg-high-vis-yellow text-asphalt px-12 py-5 rounded-full font-heading font-bold text-xl uppercase tracking-widest hover:bg-concrete transition-colors shadow-2xl hover:scale-105 transform duration-300">
                        Order Pallet Delivery
                    </button>
                </div>
            </section>

            <Footer />
        </main>
    );
}
