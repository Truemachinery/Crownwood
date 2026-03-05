import { Navbar } from "@/components/Navbar";
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
        images: [{ url: "https://new.tmlabz.com/images/striping-hero.png", width: 1200, height: 630 }],
    }
};

export const dynamic = 'force-static';

export default function StripingPage() {
    return (
        <main className="relative flex min-h-screen flex-col bg-concrete overflow-hidden">
            <Navbar />
            <StripingHero />
            <StripingCapabilities />
            <StripingProcess />
            <StripingGallery />
            <StripingServicesList />
            <StripingFAQ />
            <StripingServiceArea />

            <section className="py-24 px-6 md:px-12 lg:px-24 bg-asphalt relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #111111 25%, transparent 25%, transparent 75%, #111111 75%, #111111), repeating-linear-gradient(45deg, #FF9500 25%, transparent 25%, transparent 75%, #FF9500 75%, #FF9500)', backgroundPosition: '0 0, 20px 20px', backgroundSize: '40px 40px' }} />

                <div className="max-w-5xl mx-auto relative z-10 text-center">
                    <h2 className="font-heading font-bold text-4xl md:text-6xl text-concrete uppercase tracking-tight mb-8">
                        Achieve <span className="text-safety-amber">Compliance.</span>
                    </h2>
                    <p className="font-mono text-concrete/80 text-lg uppercase tracking-widest mb-10 max-w-2xl mx-auto">
                        Don't leave your facility vulnerable to ADA litigation. Schedule a San Antonio demarcation and striping audit today.
                    </p>
                    <button className="bg-safety-amber text-asphalt px-12 py-5 rounded-full font-heading font-bold text-xl uppercase tracking-widest hover:bg-concrete hover:text-asphalt transition-colors shadow-2xl hover:scale-105 transform duration-300">
                        Request Layout Assessment
                    </button>
                </div>
            </section>

            <Footer />
        </main>
    );
}
