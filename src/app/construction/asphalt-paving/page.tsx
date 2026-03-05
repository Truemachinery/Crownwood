import { Navbar } from "@/components/Navbar";
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

            {/* SEO Contact CTA Block */}
            <section className="py-24 px-6 md:px-12 lg:px-24 bg-safety-amber relative overflow-hidden">
                {/* Abstract tire track pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #111111 25%, transparent 25%, transparent 75%, #111111 75%, #111111), repeating-linear-gradient(45deg, #111111 25%, transparent 25%, transparent 75%, #111111 75%, #111111)', backgroundPosition: '0 0, 20px 20px', backgroundSize: '40px 40px' }} />

                <div className="max-w-5xl mx-auto relative z-10 text-center">
                    <h2 className="font-heading font-bold text-4xl md:text-6xl text-asphalt uppercase tracking-tight mb-8">
                        Dominate Your Ground.
                    </h2>
                    <p className="font-mono text-asphalt/80 text-lg uppercase tracking-widest mb-10 max-w-2xl mx-auto">
                        Schedule a San Antonio site assessment. Stop wasting capital on temporary patches and failing bases.
                    </p>
                    <button className="bg-asphalt text-safety-amber px-12 py-5 rounded-full font-heading font-bold text-xl uppercase tracking-widest hover:bg-concrete hover:text-asphalt transition-colors shadow-2xl hover:scale-105 transform duration-300">
                        Request Paving Quote
                    </button>
                </div>
            </section>

            <Footer />
        </main>
    );
}
