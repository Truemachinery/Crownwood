import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PermabaseHero } from "@/components/PermabaseHero";
import { PermabaseFeatures } from "@/components/PermabaseFeatures";
import { PermabaseProcess } from "@/components/PermabaseProcess";
import { PermabaseFAQ } from "@/components/PermabaseFAQ";
import { PermabaseGallery } from "@/components/PermabaseGallery";
import { Metadata } from "next";

// Force static rendering for entire route to ensure instant crawlability for SEO.
// The user explicitly requested: "also i want every page on this site to be static, so google doesnt have any issues crawling them all at once"
export const dynamic = 'force-static';

export const metadata: Metadata = {
    title: "Permabase™ Soil Stabilizer | Alternative to Lime Stabilization | Crownwood",
    description: "Permabase™ bio-enzyme soil stabilizer permanently alters expansive clay, eliminating undercut-and-haul costs. Safe for Edwards Aquifer. Save 30-50% on earthworks.",
    keywords: ["Permabase Soil Stabilizer", "Bio-Enzyme Soil Stabilization", "Alternative to Lime Stabilization", "Expansive Clay Treatment", "San Antonio Soil Compaction", "Eliminate Undercut and Fill", "Edwards Aquifer Safe Chemicals"],
    openGraph: {
        title: "Permabase™ | Permanent Expansive Clay Soil Stabilizer",
        description: "Bio-enzyme soil stabilizer that permanently alters expansive clay, eliminating undercut-and-haul costs.",
        images: [{ url: "https://new.tmlabz.com/images/permabase-hero.png", width: 1200, height: 630 }],
    }
};

export default function PermabasePage() {
    const productSchema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": "Permabase™ Soil Stabilizer",
        "image": "https://new.tmlabz.com/images/permabase-hero.png",
        "description": "Proprietary bio-enzyme soil stabilizer and catalyst that permanently alters the molecular structure of expansive clay, rendering it highly compactible and permanently hydrophobic.",
        "brand": {
            "@type": "Brand",
            "name": "Crownwood Chemicals"
        },
        "category": "Construction Chemicals",
        "offers": {
            "@type": "Offer",
            "url": "https://new.tmlabz.com/chemicals/permabase",
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
            <PermabaseHero />
            <PermabaseFeatures />
            <PermabaseProcess />
            <PermabaseGallery />
            <PermabaseFAQ />

            <section className="py-24 px-6 md:px-12 lg:px-24 bg-safety-amber relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #111111 25%, transparent 25%, transparent 75%, #111111 75%, #111111), repeating-linear-gradient(45deg, #FF9500 25%, transparent 25%, transparent 75%, #FF9500 75%, #FF9500)', backgroundPosition: '0 0, 20px 20px', backgroundSize: '40px 40px' }} />

                <div className="max-w-5xl mx-auto relative z-10 text-center">
                    <h2 className="font-heading font-bold text-4xl md:text-6xl text-asphalt uppercase tracking-tight mb-8">
                        Stop <span className="text-white">Digging.</span>
                    </h2>
                    <p className="font-mono text-asphalt/80 text-lg uppercase tracking-widest mb-10 max-w-2xl mx-auto">
                        Eradicate haul-out costs and compress your construction schedule. Order Permabase™ today.
                    </p>
                    <button className="bg-asphalt text-concrete px-12 py-5 rounded-full font-heading font-bold text-xl uppercase tracking-widest hover:bg-concrete hover:text-asphalt transition-colors shadow-2xl hover:scale-105 transform duration-300">
                        Request Product Specs
                    </button>
                </div>
            </section>

            <Footer />
        </main>
    );
}
