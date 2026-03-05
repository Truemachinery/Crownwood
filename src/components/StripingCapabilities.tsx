"use client";

import { BoxSelect, Grid3X3, ArrowDownToLine, Scale } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CAPABILITIES = [
    {
        id: "ada-compliance",
        title: "Strict ADA Compliance Demarcation",
        desc: "Failure to meet the Americans with Disabilities Act parking requirements invites heavy fines and federal lawsuits. We meticulously lay out handicap stalls, crosshatched access aisles, and precise municipal signage ratios to ensure your property achieves 100% legal compliance.",
        icon: Scale,
        metrics: ["Federal Compliance", "Access Aisles", "Signage Erection"]
    },
    {
        id: "thermoplastic",
        title: "Thermoplastic & High-Build Extrusion",
        desc: "For high-traffic intersections, municipal roadways, and heavy commercial entries, standard latex paint fails rapidly. We install melted thermoplastic markings that bond monolithically with the asphalt suite, providing retro-reflective brilliance that lasts up to 10 times longer.",
        icon: ArrowDownToLine,
        metrics: ["Retro-Reflective", "10x Lifespan"]
    },
    {
        id: "warehouse",
        title: "Indoor Warehouse & Industrial Safety",
        desc: "We don't just operate outdoors. Our interior division executes high-visibility epoxy safety line striping for San Antonio distribution centers, delineating forklift transit lanes, pedestrian safety zones, and hazardous material storage boundaries to comply with OSHA standards.",
        icon: BoxSelect,
        metrics: ["OSHA Validated", "Epoxy Safety Lines"]
    },
    {
        id: "layout",
        title: "New Layout Design & Optimization",
        desc: "An improperly drafted parking lot hemorrhages usable space and causes fender-benders. Our CAD-assisted layout team re-engineers traffic flow, optimizing stall angles and driving lanes to maximize vehicle capacity while maintaining safe turning radiuses.",
        icon: Grid3X3,
        metrics: ["CAD Engineering", "Capacity Maximization"]
    }
];

export function StripingCapabilities() {
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
                        Demarcation <span className="text-safety-amber">Capabilities</span>
                    </h2>
                    <p className="font-sans text-xl text-industrial/70 max-w-3xl leading-relaxed">
                        Painting lines requires geometry, mechanical consistency, and a profound understanding of municipal codes. We execute striping operations with industrial exactness.
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
