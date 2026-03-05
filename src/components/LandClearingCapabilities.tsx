"use client";

import { Flame, Route, Search, ShieldAlert } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CAPABILITIES = [
    {
        id: "brush-clearing",
        title: "Heavy Brush & Undergrowth Removal",
        desc: "South Texas vegetation is notoriously dense. We utilize high-flow forestry mulchers to instantly shred heavy cedar, mesquite, and invasive underbrush down to the soil line, converting impenetrable thickets into accessible land.",
        icon: Flame, // Metaphor for rapid eradication
        metrics: ["Forestry Mulching", "Zero-Trace Removal"]
    },
    {
        id: "tree-removal",
        title: "Large-Scale Timber Extraction",
        desc: "For mature trees that cannot be mulched, our heavy machinery division executes controlled felling and stump extraction. We ensure massive root balls are completely removed to prevent future subterranean voids.",
        icon: Search, // Actually, let's use a better icon later, sticking to standard Lucide for now
        metrics: ["Stump Grubbing", "Timber Haul-Off"]
    },
    {
        id: "grading",
        title: "Precision Site Grading",
        desc: "A cleared lot is useless without proper drainage. We cut, fill, and grade the raw earth using laser-guided GPS equipment to establish exact elevations and guarantee positive water runoff away from future structures.",
        icon: Route,
        metrics: ["Laser-Guided GPS", "Stormwater Pitching"]
    },
    {
        id: "debris",
        title: "Demolition & Debris Disposal",
        desc: "If your site contains concrete slabs, abandoned structures, or legacy debris, we demolish and haul it away. We maintain strict environmental compliance and secure proper San Antonio municipal dumping permits.",
        icon: ShieldAlert,
        metrics: ["Structural Demo", "Permitted Disposal"]
    }
];

export function LandClearingCapabilities() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray('.capability-card');

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
                    <h2 className="font-heading font-bold text-4xl md:text-5xl text-industrial uppercase tracking-tight mb-6">
                        Site Prep <span className="text-safety-amber">Capabilities</span>
                    </h2>
                    <p className="font-sans text-xl text-industrial/70 max-w-3xl leading-relaxed">
                        Our earthwork division is built on brute force and engineering exactness. We do not just clear land; we format it for heavy construction and commercial development.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {CAPABILITIES.map((cap) => (
                        <div key={cap.id} className="capability-card bg-white rounded-[2rem] p-10 border border-black/5 shadow-xl hover:shadow-2xl transition-shadow group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-safety-amber/5 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-150 duration-500" />

                            <div className="flex items-start gap-6 mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-industrial text-safety-amber flex items-center justify-center shrink-0 group-hover:bg-safety-amber group-hover:text-industrial transition-colors">
                                    <cap.icon className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-2xl text-industrial uppercase tracking-wide mb-2">{cap.title}</h3>
                                    <div className="flex gap-3 font-mono text-[10px] text-industrial/50 uppercase tracking-widest flex-wrap">
                                        {cap.metrics.map(m => (
                                            <span key={m} className="px-2 py-1 bg-industrial/5 rounded-md">{m}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <p className="font-sans text-industrial/70 leading-relaxed">
                                {cap.desc}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
