import { Navbar } from "@/components/Navbar";
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

            <section className="py-24 px-6 md:px-12 lg:px-24 bg-safety-amber relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #111111 25%, transparent 25%, transparent 75%, #111111 75%, #111111), repeating-linear-gradient(45deg, #FF9500 25%, transparent 25%, transparent 75%, #FF9500 75%, #FF9500)', backgroundPosition: '0 0, 20px 20px', backgroundSize: '40px 40px' }} />

                <div className="max-w-5xl mx-auto relative z-10 text-center">
                    <h2 className="font-heading font-bold text-4xl md:text-6xl text-asphalt uppercase tracking-tight mb-8">
                        Preserve The <span className="text-white">Asset.</span>
                    </h2>
                    <p className="font-mono text-asphalt/80 text-lg uppercase tracking-widest mb-10 max-w-2xl mx-auto">
                        Stop oxidation before structural failure occurs. Secure a commercial sealcoating assessment in San Antonio today.
                    </p>
                    <button className="bg-asphalt text-concrete px-12 py-5 rounded-full font-heading font-bold text-xl uppercase tracking-widest hover:bg-concrete hover:text-asphalt transition-colors shadow-2xl hover:scale-105 transform duration-300">
                        Request Sealcoat Quote
                    </button>
                </div>
            </section>

            <Footer />
        </main>
    );
}
