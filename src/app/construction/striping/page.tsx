import { Navbar } from "@/components/Navbar";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { StripingHero } from "@/components/StripingHero";
import { StripingCapabilities } from "@/components/StripingCapabilities";
import { StripingProcess } from "@/components/StripingProcess";
import { StripingServicesList } from "@/components/StripingServicesList";
import { StripingFAQ } from "@/components/StripingFAQ";
import { StripingServiceArea } from "@/components/StripingServiceArea";
import { StripingGallery } from "@/components/StripingGallery";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "San Antonio ADA Parking Lot Striping & Traffic Marking | Crownwood Chemicals",
    description: "Precision parking lot striping, CAD layout design, thermoplastic demarcation, and strict ADA compliance auditing serving San Antonio, TX. Mitigate liability, optimize capacity.",
    keywords: ["Parking Lot Striping San Antonio", "ADA Compliance Parking", "Thermoplastic Line Marking", "Warehouse Floor Striping", "Fire Lane Painting", "Bexar County Striping", "Parking Lot Layout"],
    openGraph: {
        title: "San Antonio ADA Parking Lot Striping | Crownwood Chemicals",
        description: "Precision parking lot striping, CAD layout design, thermoplastic demarcation, and strict ADA compliance auditing serving San Antonio.",
        images: [{ url: "https://crownwoodchemicals.com/images/striping-hero.png", width: 1200, height: 630 }],
    }
};

export const dynamic = 'force-static';

export default function StripingPage() {
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "ADA Parking Lot Striping & Traffic Marking",
        "name": "San Antonio ADA Parking Lot Striping",
        "description": "Precision parking lot striping, CAD layout design, thermoplastic demarcation, and strict ADA compliance auditing serving San Antonio, TX.",
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
            <StripingHero />
            <StripingCapabilities />
            <StripingProcess />
            <StripingGallery />
            <StripingServicesList />
            <StripingFAQ />
            <StripingServiceArea />

            {/* Contact Form */}
            <section className="py-24 px-6 md:px-12 lg:px-24 bg-concrete relative">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="font-heading font-bold text-4xl md:text-5xl text-industrial uppercase tracking-tight mb-4">
                            Request A <span className="text-safety-amber">Striping Quote</span>
                        </h2>
                        <p className="font-mono text-industrial/50 text-sm uppercase tracking-widest">
                            Schedule an ADA compliance audit and layout assessment
                        </p>
                    </div>
                    <ContactForm
                        service="Parking Lot Striping"
                        servicePath="/construction/striping"
                    />
                </div>
            </section>

            <Footer />
        </main>
    );
}
