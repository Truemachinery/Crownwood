import { Navbar } from "@/components/Navbar";
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
        images: [{ url: "https://new.tmlabz.com/images/concrete-hero.png", width: 1200, height: 630 }],
    }
};

export const dynamic = 'force-static';

export default function ConcretePage() {
    return (
        <main className="relative flex min-h-screen flex-col bg-concrete overflow-hidden">
            <Navbar />
            <ConcreteHero />
            <ConcreteCapabilities />
            <ConcreteProcess />
            <ConcreteGallery />
            <ConcreteServicesList />
            <ConcreteFAQ />
            <ConcreteServiceArea />

            <section className="py-24 px-6 md:px-12 lg:px-24 bg-asphalt relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #111111 25%, transparent 25%, transparent 75%, #111111 75%, #111111), repeating-linear-gradient(45deg, #FF9500 25%, transparent 25%, transparent 75%, #FF9500 75%, #FF9500)', backgroundPosition: '0 0, 20px 20px', backgroundSize: '40px 40px' }} />

                <div className="max-w-5xl mx-auto relative z-10 text-center">
                    <h2 className="font-heading font-bold text-4xl md:text-6xl text-concrete uppercase tracking-tight mb-8">
                        Pour <span className="text-safety-amber">Permanence.</span>
                    </h2>
                    <p className="font-mono text-concrete/80 text-lg uppercase tracking-widest mb-10 max-w-2xl mx-auto">
                        A failing slab threatens structural liability. Secure a commercial concrete assessment in San Antonio before the subgrade collapses.
                    </p>
                    <button className="bg-safety-amber text-asphalt px-12 py-5 rounded-full font-heading font-bold text-xl uppercase tracking-widest hover:bg-concrete hover:text-asphalt transition-colors shadow-2xl hover:scale-105 transform duration-300">
                        Request Flatwork Assessment
                    </button>
                </div>
            </section>

            <Footer />
        </main>
    );
}
