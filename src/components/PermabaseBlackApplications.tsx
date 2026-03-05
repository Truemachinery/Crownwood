"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Layers, Shield, PaintBucket, Hammer, RefreshCcw, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const APPLICATIONS = [
    {
        id: "chipseal-underseal",
        icon: Shield,
        title: "Chipseal Underseal & Base Stabilization",
        description: "Apply Permabase Black as the underseal before a chipseal application. It permanently stabilizes and seals the base course, creating a rock-solid, hydrophobic foundation that prevents moisture intrusion and base failure under the chipseal layer.",
        dilution: "10:1 Standard Dilution",
        highlight: "Eliminates base failure under chipseal",
    },
    {
        id: "asphalt-prime-tack",
        icon: Layers,
        title: "Asphalt Prime Coat & Tack Coat",
        description: "Use Permabase Black as a prime coat and/or tack coat for hot-mix asphalt overlays. The polymer bio-enzyme formula penetrates the existing subgrade, stabilizes the soil, and provides superior adhesion for the asphalt wearing course — all without the environmental concerns of traditional petroleum-based emulsions.",
        dilution: "10:1 Standard Dilution",
        highlight: "Replaces petroleum-based prime & tack",
    },
    {
        id: "chipseal-topcoat",
        icon: RefreshCcw,
        title: "Chipseal Road Rejuvenation Topcoat",
        description: "Mix Permabase Black at a concentrated 5:1 ratio and apply as a topcoat over existing chipseal roads. This seals cracks, re-bonds any loose aggregate rock, restores the deep black color, and extends the service life of the existing surface — all without a full re-chip or overlay.",
        dilution: "5:1 Concentrated Ratio",
        highlight: "Re-bonds loose rock & restores color",
    },
    {
        id: "asphalt-rejuvenation",
        icon: PaintBucket,
        title: "Asphalt Road Rejuvenation & Sealcoat",
        description: "Apply the same 5:1 concentrated mix over existing asphalt roads to seal surface cracks, restore the fresh-black appearance, and add a protective polymer layer that extends pavement life. A fraction of the cost of traditional sealcoating or mill-and-overlay.",
        dilution: "5:1 Concentrated Ratio",
        highlight: "Fraction of traditional sealcoat cost",
    },
];

export function PermabaseBlackApplications() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray('.app-card');

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
                delay: i * 0.1
            });
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-32 px-6 md:px-12 lg:px-24 bg-[#0D0D0D] relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #FFB300 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="w-12 h-1 bg-safety-amber"></div>
                        <span className="font-mono text-sm text-safety-amber uppercase tracking-widest font-bold">Beyond Soil Stabilization</span>
                        <div className="w-12 h-1 bg-safety-amber"></div>
                    </div>
                    <h2 className="font-heading font-bold text-4xl md:text-5xl text-concrete uppercase tracking-tight mb-6">
                        Multi-Surface <span className="text-safety-amber font-drama italic">Applications</span>
                    </h2>
                    <p className="font-sans text-xl text-concrete/70 max-w-3xl mx-auto leading-relaxed">
                        Permabase Black isn&apos;t just for raw soil. Use it as an underseal, prime coat, tack coat, or rejuvenation topcoat on existing chipseal and asphalt surfaces.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {APPLICATIONS.map((app) => (
                        <div key={app.id} className="app-card bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-3xl p-10 hover:border-safety-amber/30 hover:bg-white/[0.07] transition-all duration-300 group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-safety-amber/5 rounded-bl-[120px] -z-10 transition-transform group-hover:scale-150 duration-500" />

                            <div className="flex items-start gap-5 mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-safety-amber/10 text-safety-amber border border-safety-amber/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                    <app.icon className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-xl text-concrete uppercase tracking-wide mb-2">{app.title}</h3>
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <span className="px-3 py-1 bg-safety-amber/10 border border-safety-amber/20 text-safety-amber font-mono text-[10px] uppercase tracking-widest rounded-full">
                                            {app.dilution}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <p className="font-sans text-concrete/70 text-lg leading-relaxed mb-6">
                                {app.description}
                            </p>

                            <div className="flex items-center gap-2 text-safety-amber font-mono text-xs uppercase tracking-widest">
                                <ArrowRight className="w-3 h-3" />
                                {app.highlight}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
