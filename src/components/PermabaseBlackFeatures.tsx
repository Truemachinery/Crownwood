"use client";

import { HandCoins, Palette, Layers, Sprout } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
    {
        id: "aesthetic-upgrade",
        title: "Premium Asphalt Aesthetic",
        desc: "Achieve the visual impact of a freshly paved or sealcoated parking lot without the exorbitant cost of importing hot-mix asphalt. The proprietary carbon-black tint penetrates deep into the soil matrix, resulting in a dark, uniform surface that instantly elevates property value.",
        icon: Palette,
        metrics: ["Dark Uniform Surface", "High-End Visual Impact"]
    },
    {
        id: "cost-multiplier",
        title: "Budget-Saving Double Utility",
        desc: "Avoid paying twice. Instead of stabilizing the subgrade with lime and then paying separately to cap it with an asphalt wearing course, Permabase Black performs both functions. It creates a rock-solid, hydrophobic base that simultaneously serves as the finished aesthetic surface for low-speed applications.",
        icon: HandCoins,
        metrics: ["Eliminate Asphalt Caps", "Dual-Action Budget Saver"]
    },
    {
        id: "dust-control",
        title: "Extreme Dust Suppression",
        desc: "Untreated dirt roads, rural pathways, and construction staging areas generate massive amounts of fugitive PM10 dust. Permabase Black binds the microscopic soil particles together, locking down dust permanently while providing a clean, dark driving surface.",
        icon: Layers,
        metrics: ["PM10 Dust Elimination", "Rural Road Paving Alternative"]
    },
    {
        id: "eco-safe",
        title: "Environmentally Safe Finish",
        desc: "Traditional asphalt and oil-based dust suppressants leach hydrocarbons into the water table. Permabase Black relies on a non-toxic bio-enzyme catalyst combined with an inert carbon pigment. It is 100% safe for agricultural perimeters and aquifer recharge zones.",
        icon: Sprout,
        metrics: ["Zero Hydrocarbons", "Inert Carbon Pigment", "Eco-Compliant"]
    }
];

export function PermabaseBlackFeatures() {
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
                        Dual-Action <span className="text-safety-amber">Utility</span>
                    </h2>
                    <p className="font-sans text-xl text-industrial/70 max-w-3xl leading-relaxed">
                        Permabase Black is engineered for developers, land owners, and municipalities looking to achieve the structural integrity of concrete and the visual appeal of asphalt—in a single, cost-effective pass.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {FEATURES.map((feature) => (
                        <div key={feature.id} className="feature-card bg-white rounded-[2rem] p-10 border border-black/5 shadow-xl hover:shadow-2xl transition-shadow group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-asphalt/5 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-150 duration-500" />

                            <div className="flex items-start gap-6 mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-industrial/5 text-industrial border border-industrial/10 flex items-center justify-center shrink-0 group-hover:bg-[#111] group-hover:text-safety-amber transition-colors shadow-sm">
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
