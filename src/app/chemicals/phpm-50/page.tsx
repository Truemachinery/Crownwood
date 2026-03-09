import { Navbar } from "@/components/Navbar";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { PhpmHero } from "@/components/PhpmHero";
import { PhpmFeatures } from "@/components/PhpmFeatures";
import { PhpmProcess } from "@/components/PhpmProcess";
import { PhpmFAQ } from "@/components/PhpmFAQ";
import { Metadata } from "next";

export const dynamic = 'force-static';

export const metadata: Metadata = {
    title: "PHPM-50™ (PHPM50) Heatless Tack Oil & Pothole Patch | Crownwood Chemicals",
    description: "PHPM-50 (PHPM50) is a commercial-grade heatless tack oil and hydro-reactive pothole repair polymer. This heatless tac oil cures permanently in standing water. Available in 275-gallon totes.",
    keywords: ["PHPM-50 Pothole Patch", "PHPM50", "Heatless Tack Oil", "Heatless Tac Oil", "Commercial Pothole Repair", "Hydro-Reactive Asphalt Patch", "Cold Patch Alternative", "Permanent Pothole Fix", "San Antonio Asphalt Repair", "Municipal Pothole Mitigation", "275 Gallon Tote"],
    openGraph: {
        title: "PHPM-50™ (PHPM50) | Heatless Tack Oil & Hydro-Reactive Pothole Patch",
        description: "PHPM50 heatless tack oil and pothole patch — cures permanently in standing water. Available in 275-gallon totes.",
        images: [{ url: "https://crownwoodchemicals.com/images/phpm-hero.png", width: 1200, height: 630 }],
    }
};

export default function PhpmPage() {
    const productSchema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": "PHPM-50™ (PHPM50) Heatless Tack Oil & Pothole Patch",
        "image": "https://crownwoodchemicals.com/images/phpm-hero.png",
        "description": "PHPM-50 (PHPM50) is a commercial-grade heatless tack oil and hydro-reactive pothole repair polymer. Available in 275-gallon totes. Cures permanently in standing water and extreme temperatures.",
        "brand": {
            "@type": "Brand",
            "name": "Crownwood Chemicals"
        },
        "category": "Construction Chemicals",
        "offers": {
            "@type": "Offer",
            "url": "https://crownwoodchemicals.com/chemicals/phpm-50",
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

            {/* Contact Form */}
            <section className="py-24 px-6 md:px-12 lg:px-24 bg-asphalt relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000000 25%, transparent 25%, transparent 75%, #000000 75%, #000000), repeating-linear-gradient(45deg, #1A1A1A 25%, transparent 25%, transparent 75%, #1A1A1A 75%, #1A1A1A)', backgroundPosition: '0 0, 20px 20px', backgroundSize: '40px 40px' }} />
                <div className="max-w-3xl mx-auto relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="font-heading font-bold text-4xl md:text-5xl text-concrete uppercase tracking-tight mb-4">
                            Order <span className="text-high-vis-yellow">PHPM-50™</span>
                        </h2>
                        <p className="font-mono text-concrete/60 text-sm uppercase tracking-widest">
                            Request 275-gallon tote pricing or ask a technical question
                        </p>
                    </div>
                    <ContactForm
                        service="PHPM-50™ Pothole Patch"
                        servicePath="/chemicals/phpm-50"
                        darkMode={true}
                    />
                </div>
            </section>

            <Footer />
        </main>
    );
}
