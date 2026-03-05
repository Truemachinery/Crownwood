"use client";

import { Leaf, DollarSign, Sprout, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CAPABILITIES = [
    {
        id: "cost-efficiency",
        title: "Financial Superiority",
        desc: "Laying commercial sod across acres of retention ponds or highway right-of-ways is financially crippling. Hydro-seeding covers massive square footage rapidly, typically costing 60% to 75% less than traditional sod installation while yielding healthier long-term root structures.",
        icon: DollarSign,
        color: "text-[#4CAF50]",
        bg: "bg-[#4CAF50]"
    },
    {
        id: "erosion-lock",
        title: "Instant Erosion Lock",
        desc: "When rain hits a freshly graded commercial pad, sheet erosion destroys the subgrade. Our slurry contains heavy-duty mucilage tackifiers and bonded fiber matrix (BFM) that instantly glue the mulch and seed to the soil, holding embankments secure against severe TxDOT runoff.",
        icon: ShieldCheck,
        color: "text-safety-amber",
        bg: "bg-safety-amber"
    },
    {
        id: "custom-blend",
        title: "Geotech Seed Blending",
        desc: "In San Antonio, you cannot throw generic rye seed and expect survival. We architect our slurry with drought-resistant native Texas grasses (like Bermuda and Buffalo Grass), bio-stimulants, and pH-balancing soil amendments tailored exactly geographically.",
        icon: Sprout,
        color: "text-[#4CAF50]",
        bg: "bg-[#4CAF50]"
    },
    {
        id: "deep-root",
        title: "Superior Root Genesis",
        desc: "Sod suffers from transplant shock and shallow rooting, leading to rapid die-off during Texas droughts. Hydro-seeding allows the seed to germinate directly where it will live permanently. The mulch acts as an incubator, trapping moisture and accelerating deep taproot development.",
        icon: Leaf,
        color: "text-safety-amber",
        bg: "bg-safety-amber"
    }
];

export function HydroSeedingCapabilities() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray('.capability-card');

        cards.forEach((card: any, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                delay: i * 0.1
            });
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-24 px-6 md:px-12 lg:px-24 bg-concrete relative z-10">
            <div className="max-w-7xl mx-auto">

                <div className="mb-20">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-1 bg-[#4CAF50]"></div>
                        <span className="font-mono text-sm text-[#4CAF50] uppercase tracking-widest font-bold">The Biological Advantage</span>
                    </div>
                    <h2 className="font-heading font-bold text-4xl md:text-5xl text-industrial uppercase tracking-tight max-w-2xl">
                        Why We <span className="text-[#4CAF50] italic">Outperform</span> Traditional Sod.
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {CAPABILITIES.map((cap) => (
                        <div key={cap.id} className="capability-card bg-white p-8 border border-black/5 hover:border-[#4CAF50]/30 transition-colors shadow-sm hover:shadow-xl group">
                            <div className="mb-6 overflow-hidden">
                                <cap.icon className={`w-12 h-12 ${cap.color} transform group-hover:scale-110 transition-transform duration-500`} />
                            </div>

                            <h3 className="font-heading font-bold text-xl text-industrial uppercase tracking-wide mb-4">
                                {cap.title}
                            </h3>

                            <p className="font-sans text-industrial/70 text-sm leading-relaxed">
                                {cap.desc}
                            </p>

                            <div className={`w-0 h-1 ${cap.bg} mt-8 group-hover:w-full transition-all duration-500 ease-out`}></div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
