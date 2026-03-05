"use client";

import { BoxSelect, Grid, ShieldHalf, Scale } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CAPABILITIES = [
    {
        id: "flatwork",
        title: "Commercial Flatwork & Pads",
        desc: "We pour high-capacity concrete slabs, dumpster pads, and loading docks. Engineered with dense steel rebar grids and high-PSI concrete mixes, our flatwork is designed specifically to bear the point-load of 18-wheelers and heavy refuse trucks without fracturing.",
        icon: Grid,
        metrics: ["Dumpster Pads", "Loading Docks", "Heavy Point-Load"]
    },
    {
        id: "ada-ramps",
        title: "ADA Ramp & Sidewalk Construction",
        desc: "Accessibility lawsuits are a severe threat to San Antonio business owners. We tear out non-compliant concrete and construct new sidewalks, access ramps, and truncated dome tactile warnings that surgically hit the 1:12 slope ratio required by Title III of the ADA.",
        icon: Scale,
        metrics: ["1:12 Slope Ratio", "Tactile Warnings", "Title III Compliance"]
    },
    {
        id: "curb-gutter",
        title: "Extruded Curb & Gutter Systems",
        desc: "Effective stormwater divergence dictates the lifespan of a parking facility. We form and pour contiguous concrete curbs and monolithic gutter systems that rapidly channel heavy Texas downpours into localized municipal drainage grids.",
        icon: BoxSelect,
        metrics: ["Stormwater Control", "Monolithic Pours"]
    },
    {
        id: "repair",
        title: "Structural Rehabilitation",
        desc: "When existing slabs heave or crack due to subgrade failure, we deploy heavy demolition equipment to remove the compromised concrete, stabilize the exposed earthen base with Permabase technology, and pour a reinforced replacement slab.",
        icon: ShieldHalf,
        metrics: ["Demolition", "Subgrade Repair", "Re-Pour"]
    }
];

export function ConcreteCapabilities() {
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
                        Structural <span className="text-safety-amber">Capabilities</span>
                    </h2>
                    <p className="font-sans text-xl text-industrial/70 max-w-3xl leading-relaxed">
                        Concrete fails when the engineering is ignored. We build immovable, high-strength assets structurally bonded by steel and designed for extreme environmental loads.
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
