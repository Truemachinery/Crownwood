import { Navbar } from "@/components/Navbar";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { ConcreteHero } from "@/components/ConcreteHero";
import { ConcreteCapabilities } from "@/components/ConcreteCapabilities";
import { ConcreteProcess } from "@/components/ConcreteProcess";
import { ConcreteServicesList } from "@/components/ConcreteServicesList";
import { ConcreteFAQ } from "@/components/ConcreteFAQ";
import { ConcreteServiceArea } from "@/components/ConcreteServiceArea";
import { ConcreteGallery } from "@/components/ConcreteGallery";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "San Antonio Commercial Concrete & Flatwork Services | Crownwood Chemicals",
    description: "Heavy industrial commercial concrete flatwork, ADA access ramps, warehouse loading docks, and structural demolition in San Antonio, TX. We engineer for maximum point-loads.",
    keywords: ["Commercial Concrete San Antonio", "Concrete Flatwork", "ADA Concrete Ramps", "Concrete Subgrade Repair", "Dumpster Pad Pouring", "Bexar County Concrete Contractors", "Extruded Curb and Gutter"],
    openGraph: {
        title: "San Antonio Commercial Concrete Services | Crownwood Chemicals",
        description: "Heavy industrial commercial concrete flatwork, ADA ramps, and structural repair in San Antonio.",
        images: [{ url: "https://crownwoodchemicals.com/images/concrete-hero.png", width: 1200, height: 630 }],
    },
    alternates: {
        canonical: "/construction/concrete",
    },
};

export const dynamic = 'force-static';

export default function ConcretePage() {
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Commercial Concrete & Flatwork",
        "name": "San Antonio Commercial Concrete Services",
        "description": "Heavy industrial commercial concrete flatwork, ADA access ramps, warehouse loading docks, dumpster pads, and structural demolition in San Antonio, TX.",
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
            <ConcreteHero />
            <ConcreteCapabilities />
            <ConcreteProcess />
            <ConcreteGallery />
            <ConcreteServicesList />
            <ConcreteFAQ />
            <ConcreteServiceArea />

            {/* Contact Form */}
            <section className="py-24 px-6 md:px-12 lg:px-24 bg-concrete relative">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="font-heading font-bold text-4xl md:text-5xl text-industrial uppercase tracking-tight mb-4">
                            Request A <span className="text-safety-amber">Concrete Quote</span>
                        </h2>
                        <p className="font-mono text-industrial/50 text-sm uppercase tracking-widest">
                            Schedule a commercial flatwork assessment in San Antonio
                        </p>
                    </div>
                    <ContactForm
                        service="Commercial Concrete"
                        servicePath="/construction/concrete"
                    />
                </div>
            </section>

            <Footer />
        </main>
    );
}
