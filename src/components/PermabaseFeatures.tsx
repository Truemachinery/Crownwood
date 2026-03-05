"use client";

import { Leaf, DollarSign, Clock, ShieldAlert } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
    {
        id: "cost-savings",
        title: "Eradicate Haul-Out Costs",
        desc: "Traditional stabilization requires excavating native clay, paying massive landfill tipping fees, and importing expensive flex base rock. Permabase works directly with your existing, failing soil. By eliminating the 'dig and haul', developers consistently save 30% to 50% on subgrade preparation budgets.",
        icon: DollarSign,
        metrics: ["Avoid Tipping Fees", "Zero Flex Base Import", "-40% Average Cost"]
    },
    {
        id: "time-compression",
        title: "Aggressive Schedule Compression",
        desc: "A conventional undercut and fill operation takes weeks and requires dozens of articulated trucks. Permabase is applied via standard water trucks, bladed into the soil in lifts, and compacted. We compress weeks of earthwork into days, fundamentally accelerating the critical path of construction.",
        icon: Clock,
        metrics: ["Rapid Application", "Compress Critical Path"]
    },
    {
        id: "permanent-shield",
        title: "Permanent Water Immunity",
        desc: "Unlike lime, which can leach out over decades, Permabase utilizes an irreversible biochemical reaction. It electrochemically forces water molecules out of the clay lattice and collapses the voids. The treated soil becomes permanently hydrophobic, refusing to swell or absorb moisture ever again.",
        icon: ShieldAlert,
        metrics: ["Irreversible Reaction", "Hydrophobic Subgrade", "No Swell Potential"]
    },
    {
        id: "eco-compliant",
        title: "100% Environmentally Compliant",
        desc: "Permabase is a non-toxic, non-corrosive bio-enzyme formula. It contains no volatile organic compounds (VOCs) and does not disrupt local groundwater tables. It is exceptionally safe for application near sensitive Edwards Aquifer recharge zones in San Antonio.",
        icon: Leaf,
        metrics: ["Zero VOCs", "Edwards Aquifer Safe", "Non-Toxic Formula"]
    }
];

export function PermabaseFeatures() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray('.feature-card');

        cards.forEach((card: any, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                delay: i % 2 === 0 ? 0 : 0.2
            });
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-32 px-6 md:px-12 lg:px-24 bg-concrete relative">
            <div className="max-w-7xl mx-auto">

                <div className="mb-20">
                    <h2 className="font-heading font-bold text-4xl md:text-5xl text-industrial uppercase tracking-tight mb-6 flex flex-col md:flex-row gap-2">
                        Engineered <span className="text-safety-amber">Advantages</span>
                    </h2>
                    <p className="font-sans text-xl text-industrial/70 max-w-3xl leading-relaxed">
                        Permabase isn't just a chemical; it is an economic strategy. It fundamentally alters the logistics, cost structure, and timeline of commercial earthworks.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {FEATURES.map((feature) => (
                        <div key={feature.id} className="feature-card bg-white rounded-[2rem] p-10 border border-black/5 shadow-xl hover:shadow-2xl transition-shadow group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-safety-amber/5 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-150 duration-500" />

                            <div className="flex items-start gap-6 mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-industrial/5 text-safety-amber border border-safety-amber/20 flex items-center justify-center shrink-0 group-hover:bg-safety-amber group-hover:text-industrial transition-colors shadow-sm">
                                    <feature.icon className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-2xl text-industrial uppercase tracking-wide mb-2">{feature.title}</h3>
                                    <div className="flex gap-3 font-mono text-[10px] text-industrial/50 uppercase tracking-widest flex-wrap">
                                        {feature.metrics.map(m => (
                                            <span key={m} className="px-2 py-1 bg-industrial/5 rounded-md">{m}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <p className="font-sans text-industrial/70 leading-relaxed text-lg">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
