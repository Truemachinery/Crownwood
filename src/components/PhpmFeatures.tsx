"use client";

import { Droplet, ThermometerSun, Truck, ShieldAlert } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
    {
        id: "water-displacement",
        title: "Hydro-Reactive Catalyst",
        desc: "You no longer need a dry hole. PHPM-50 contains proprietary water-displacing polymers. You can literally pour the patch directly into a pothole filled with standing water during a thunderstorm. The patch aggressively displaces the moisture and adheres permanently to the failing asphalt.",
        icon: Droplet,
        metrics: ["Works in Standing Water", "No Drying Required"]
    },
    {
        id: "extreme-temps",
        title: "Thermal Expansion Tolerance",
        desc: "Standard cold patches harden, turn brittle, and shatter under San Antonio's extreme summer heat. PHPM-50 is engineered with highly pliable elastomers that allow the patch to flex, expand, and contract with the surrounding pavement without breaking its structural bond.",
        icon: ThermometerSun,
        metrics: ["Flexible Elastomers", "0°F to 120°F Performance", "No Summer Bleed"]
    },
    {
        id: "immediate-traffic",
        title: "Zero Setup Downtime",
        desc: "Once the material is poured and tamped down, it is immediately ready for heavy vehicular traffic. You do not need to block off lanes, wait for curing, or worry about tracking. An 18-wheeler can roll over the patch 30 seconds after installation without causing rutting.",
        icon: Truck,
        metrics: ["Instant Traffic Reopening", "No Lane Closures"]
    },
    {
        id: "permanent-fix",
        title: "Guaranteed Permanence",
        desc: "This is not a temporary winter fix. When properly compacted, PHPM-50 becomes highly dense and permanently fuses to the host material. In many cases, the patch outlasts the surrounding asphalt itself, eliminating the need to repeatedly dispatch maintenance crews to the same crater.",
        icon: ShieldAlert,
        metrics: ["Permanent Structural Repair", "Outlasts Surrounding Asphalt"]
    }
];

export function PhpmFeatures() {
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
                        Industrial <span className="text-high-vis-yellow">Performance</span>
                    </h2>
                    <p className="font-sans text-xl text-industrial/70 max-w-3xl leading-relaxed">
                        Engineered exclusively for commercial property managers, municipalities, and paving contractors who cannot afford to patch the same pothole twice.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {FEATURES.map((feature) => (
                        <div key={feature.id} className="feature-card bg-white rounded-[2rem] p-10 border border-black/5 shadow-xl hover:shadow-2xl transition-shadow group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-high-vis-yellow/5 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-150 duration-500" />

                            <div className="flex items-start gap-6 mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-industrial/5 text-industrial border border-industrial/10 flex items-center justify-center shrink-0 group-hover:bg-industrial group-hover:text-high-vis-yellow transition-colors shadow-sm">
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
