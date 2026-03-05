import { Navbar } from "@/components/Navbar";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { AsphaltHero } from "@/components/AsphaltHero";
import { AsphaltCapabilities } from "@/components/AsphaltCapabilities";
import { AsphaltServicesList } from "@/components/AsphaltServicesList";
import { AsphaltProcess } from "@/components/AsphaltProcess";
import { AsphaltFAQ } from "@/components/AsphaltFAQ";
import { AsphaltServiceArea } from "@/components/AsphaltServiceArea";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "San Antonio Asphalt Paving Services & Commercial Paving | Crownwood Chemicals",
    description: "Elite commercial asphalt paving, parking lot tear-outs, overlays, and structural repair in San Antonio, TX. We engineer permanent, eco-friendly subgrade stabilization and unrivaled construction precision using Permabase technology.",
    keywords: ["Asphalt Paving San Antonio", "Commercial Paving Contractors", "Asphalt Milling", "Parking Lot Repair", "TexDot Asphalt Specs", "Bexar County Paving", "Subgrade Stabilization"],
    openGraph: {
        title: "San Antonio Asphalt Paving Services | Crownwood Chemicals",
        description: "Elite commercial asphalt paving, tear-outs, overlays, and structural repair in San Antonio, TX.",
        images: [{ url: "https://new.tmlabz.com/images/asphalt-hero.png", width: 1200, height: 630 }],
    }
};

export const dynamic = 'force-static';

export default function AsphaltPavingPage() {
    return (
        <main className="relative flex min-h-screen flex-col bg-concrete overflow-hidden">
            <Navbar />
            <AsphaltHero />
            <AsphaltCapabilities />
            <AsphaltProcess />
            <AsphaltServicesList />
            <AsphaltFAQ />
            <AsphaltServiceArea />

            {/* Contact Form */}
            <section className="py-24 px-6 md:px-12 lg:px-24 bg-concrete relative">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="font-heading font-bold text-4xl md:text-5xl text-industrial uppercase tracking-tight mb-4">
                            Request A <span className="text-safety-amber">Paving Quote</span>
                        </h2>
                        <p className="font-mono text-industrial/50 text-sm uppercase tracking-widest">
                            Schedule a San Antonio site assessment
                        </p>
                    </div>
                    <ContactForm
                        service="Asphalt Paving"
                        servicePath="/construction/asphalt-paving"
                    />
                </div>
            </section>

            <Footer />
        </main>
    );
}
