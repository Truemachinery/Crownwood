import { Navbar } from "@/components/Navbar";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
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
        images: [{ url: "https://crownwoodchemicals.com/images/permabase-hero.png", width: 1200, height: 630 }],
    },
    alternates: {
        canonical: "/chemicals/permabase",
    },
};

export default function PermabasePage() {
    const productSchema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": "Permabase™ Soil Stabilizer",
        "image": "https://crownwoodchemicals.com/images/permabase-hero.png",
        "description": "Proprietary bio-enzyme soil stabilizer and catalyst that permanently alters the molecular structure of expansive clay, rendering it highly compactible and permanently hydrophobic.",
        "brand": {
            "@type": "Brand",
            "name": "Crownwood Chemicals"
        },
        "category": "Construction Chemicals",
        "offers": {
            "@type": "Offer",
            "url": "https://crownwoodchemicals.com/chemicals/permabase",
            "priceCurrency": "USD",
            "price": "5400.00",
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
            <Hero />
            <PermabaseFeatures />
            <PermabaseProcess />
            <PermabaseGallery />
            <PermabaseFAQ />

            {/* Contact Form */}
            <section className="py-24 px-6 md:px-12 lg:px-24 bg-concrete relative">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="font-heading font-bold text-4xl md:text-5xl text-industrial uppercase tracking-tight mb-4">
                            Get A <span className="text-safety-amber">Quote</span>
                        </h2>
                        <p className="font-mono text-industrial/50 text-sm uppercase tracking-widest">
                            Tell us about your project and we'll get back within 24 hours
                        </p>
                    </div>
                    <ContactForm
                        service="Permabase™ Soil Stabilizer"
                        servicePath="/chemicals/permabase"
                    />
                </div>
            </section>

            <Footer />
        </main>
    );
}
