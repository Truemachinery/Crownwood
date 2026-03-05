import { Navbar } from "@/components/Navbar";
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
        images: [{ url: "https://new.tmlabz.com/images/land-clearing-hero.png", width: 1200, height: 630 }],
    }
};

export const dynamic = 'force-static';

export default function LandClearingPage() {
    return (
        <main className="relative flex min-h-screen flex-col bg-concrete overflow-hidden">
            <Navbar />
            <LandClearingHero />
            <LandClearingCapabilities />
            <LandClearingProcess />
            <LandClearingServicesList />
            <LandClearingFAQ />
            <LandClearingServiceArea />

            <section className="py-24 px-6 md:px-12 lg:px-24 bg-asphalt relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #111111 25%, transparent 25%, transparent 75%, #111111 75%, #111111), repeating-linear-gradient(45deg, #FF9500 25%, transparent 25%, transparent 75%, #FF9500 75%, #FF9500)', backgroundPosition: '0 0, 20px 20px', backgroundSize: '40px 40px' }} />

                <div className="max-w-5xl mx-auto relative z-10 text-center">
                    <h2 className="font-heading font-bold text-4xl md:text-6xl text-concrete uppercase tracking-tight mb-8">
                        Deploy Heavy <span className="text-safety-amber">Iron.</span>
                    </h2>
                    <p className="font-mono text-concrete/80 text-lg uppercase tracking-widest mb-10 max-w-2xl mx-auto">
                        Schedule a San Antonio site assessment. Turn raw acreage into a perfectly graded, stabilized commercial asset.
                    </p>
                    <button className="bg-safety-amber text-asphalt px-12 py-5 rounded-full font-heading font-bold text-xl uppercase tracking-widest hover:bg-concrete hover:text-asphalt transition-colors shadow-2xl hover:scale-105 transform duration-300">
                        Request Clearing Quote
                    </button>
                </div>
            </section>

            <Footer />
        </main>
    );
}
