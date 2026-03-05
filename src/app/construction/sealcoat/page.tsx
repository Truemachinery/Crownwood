import { Navbar } from "@/components/Navbar";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { SealcoatHero } from "@/components/SealcoatHero";
import { SealcoatCapabilities } from "@/components/SealcoatCapabilities";
import { SealcoatProcess } from "@/components/SealcoatProcess";
import { SealcoatServicesList } from "@/components/SealcoatServicesList";
import { SealcoatFAQ } from "@/components/SealcoatFAQ";
import { SealcoatServiceArea } from "@/components/SealcoatServiceArea";
import { SealcoatGallery } from "@/components/SealcoatGallery";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "San Antonio Sealcoating & Parking Lot Striping | Crownwood Chemicals",
    description: "Industrial-grade commercial parking lot sealcoating, asphalt preservation, crack routing, and ADA striping in San Antonio, TX. Protect your paving investment.",
    keywords: ["Sealcoating San Antonio", "Parking Lot Sealcoat", "Commercial Asphalt Sealer", "Parking Lot Striping", "Crack Sealing Contractors", "ADA Striping Bexar County", "Permabase Black"],
    openGraph: {
        title: "San Antonio Commercial Sealcoating | Crownwood Chemicals",
        description: "Industrial-grade commercial parking lot sealcoating, asphalt preservation, and ADA striping in San Antonio, TX.",
        images: [{ url: "https://new.tmlabz.com/images/sealcoat-hero.png", width: 1200, height: 630 }],
    }
};

export const dynamic = 'force-static';

export default function SealcoatPage() {
    return (
        <main className="relative flex min-h-screen flex-col bg-concrete overflow-hidden">
            <Navbar />
            <SealcoatHero />
            <SealcoatCapabilities />
            <SealcoatProcess />
            <SealcoatGallery />
            <SealcoatServicesList />
            <SealcoatFAQ />
            <SealcoatServiceArea />

            {/* Contact Form */}
            <section className="py-24 px-6 md:px-12 lg:px-24 bg-concrete relative">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="font-heading font-bold text-4xl md:text-5xl text-industrial uppercase tracking-tight mb-4">
                            Request A <span className="text-safety-amber">Sealcoat Quote</span>
                        </h2>
                        <p className="font-mono text-industrial/50 text-sm uppercase tracking-widest">
                            Protect your parking lot investment — get a free assessment
                        </p>
                    </div>
                    <ContactForm
                        service="Commercial Sealcoating"
                        servicePath="/construction/sealcoat"
                    />
                </div>
            </section>

            <Footer />
        </main>
    );
}
