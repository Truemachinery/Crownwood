import { Navbar } from "@/components/Navbar";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { LandClearingHero } from "@/components/LandClearingHero";
import { LandClearingCapabilities } from "@/components/LandClearingCapabilities";
import { LandClearingProcess } from "@/components/LandClearingProcess";
import { LandClearingServicesList } from "@/components/LandClearingServicesList";
import { LandClearingFAQ } from "@/components/LandClearingFAQ";
import { LandClearingServiceArea } from "@/components/LandClearingServiceArea";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "San Antonio Land Clearing & Site Prep | Crownwood Chemicals",
    description: "Heavy-duty land clearing, precision site grading, and commercial pad site preparation serving San Antonio, TX. We engineer the ultimate blank canvas.",
    keywords: ["Land Clearing San Antonio", "Commercial Site Prep", "Excavation Contractors", "Forestry Mulching", "Right-of-Way Clearing", "Bexar County Land Clearing", "Detention Pond Excavation"],
    openGraph: {
        title: "San Antonio Land Clearing Services | Crownwood Chemicals",
        description: "Heavy-duty land clearing, precision site grading, and commercial pad site preparation serving San Antonio, TX.",
        images: [{ url: "https://crownwoodchemicals.com/images/land-clearing-hero.png", width: 1200, height: 630 }],
    },
    alternates: {
        canonical: "/construction/land-clearing",
    },
};

export const dynamic = 'force-static';

export default function LandClearingPage() {
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Land Clearing & Site Preparation",
        "name": "San Antonio Land Clearing & Site Prep",
        "description": "Heavy-duty land clearing, precision site grading, forestry mulching, and commercial pad site preparation serving San Antonio, TX.",
        "provider": {
            "@type": "LocalBusiness",
            "name": "Crownwood Chemicals",
            "address": { "@type": "PostalAddress", "addressLocality": "San Antonio", "addressRegion": "TX" }
        },
        "areaServed": { "@type": "City", "name": "San Antonio" }
    };

    return (
        <main className="relative flex min-h-screen flex-col bg-concrete overflow-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <Navbar />
            <LandClearingHero />
            <LandClearingCapabilities />
            <LandClearingProcess />
            <LandClearingServicesList />
            <LandClearingFAQ />
            <LandClearingServiceArea />

            {/* Contact Form */}
            <section className="py-24 px-6 md:px-12 lg:px-24 bg-concrete relative">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="font-heading font-bold text-4xl md:text-5xl text-industrial uppercase tracking-tight mb-4">
                            Request A <span className="text-safety-amber">Clearing Quote</span>
                        </h2>
                        <p className="font-mono text-industrial/50 text-sm uppercase tracking-widest">
                            Schedule a San Antonio site assessment
                        </p>
                    </div>
                    <ContactForm
                        service="Land Clearing & Site Prep"
                        servicePath="/construction/land-clearing"
                    />
                </div>
            </section>

            <Footer />
        </main>
    );
}
