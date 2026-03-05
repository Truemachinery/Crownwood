"use client";

import { Hammer, Layers, Ruler, TriangleAlert } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CAPABILITIES = [
    {
        id: "tear-out",
        title: "Full Sub-Base Tear-Outs",
        desc: "We don't pave over failure. If your subgrade is compromised by extreme San Antonio soil shifting, our heavy machinery crews completely excavate the site. We treat the raw earth before laying a single ton of rock.",
        icon: TriangleAlert,
        metrics: ["Laser-Guided Excavation", "Soil Decontamination"]
    },
    {
        id: "overlay",
        title: "High-Density Overlays",
        desc: "For existing infrastructure with a sound base but surface-level oxidation, we provide precision milling and high-density hot mix overlays. Engineered to extend the lifespan of commercial parking lots and municipal roads.",
        icon: Layers,
        metrics: ["Precision Milling", "Tack Coat Bonding"]
    },
    {
        id: "new-build",
        title: "New Road Construction",
        desc: "From undeveloped dirt to striped, finished asphalt. We handle the entire lifecycle: clearing, grading, base stabilization with Permabase, and top-tier hot mix application.",
        icon: Ruler,
        metrics: ["Turnkey Development", "TxDOT Spec Compliant"]
    },
    {
        id: "repair",
        title: "Structural Pothole Repair",
        desc: "Temporary patches fail. We saw-cut the perimeter, remove the damaged asphalt and base, treat the cavity with PHPM-50, and install a structural hot-mix patch that outlasts the surrounding pavement.",
        icon: Hammer,
        metrics: ["Saw-Cut Borders", "PHPM-50 Modification"]
    }
];

export function AsphaltCapabilities() {
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
                        Paving <span className="text-safety-amber">Capabilities</span>
                    </h2>
                    <p className="font-sans text-xl text-industrial/70 max-w-3xl leading-relaxed">
                        Our San Antonio paving division operates with military precision. We deploy company-owned machinery and elite crews to execute heavy infrastructure projects without compromise.
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
