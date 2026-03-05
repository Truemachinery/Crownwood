"use client";

import { Droplet, Spline, Route } from "lucide-react";

const PROTOCOLS = [
    {
        step: "01",
        title: "Formulation",
        desc: "We analyze local Houston & San Antonio soil compositions to prescribe the exact polymer emulsion required. Our laboratory-grade stabilization process begins before we ever hit the dirt.",
        icon: Droplet,
        color: "bg-concrete text-industrial"
    },
    {
        step: "02",
        title: "Preparation",
        desc: "Heavy machinery executes precise land grading and leveling. We strip weak sub-bases, eradicate organic material, and pre-treat the aggregate to ensure absolute molecular bonding with our chemicals.",
        icon: Spline,
        color: "bg-industrial text-concrete"
    },
    {
        step: "03",
        title: "Execution",
        desc: "High-yield application of Permabase or Black wearing surfaces. Our paving and sealcoat crews finalize the infrastructure, delivering a waterproof, unbreakable surface guaranteed to outlast toxic alternatives.",
        icon: Route,
        color: "bg-safety-amber text-asphalt"
    }
];

export function Protocol() {
    return (
        <section className="py-32 px-6 md:px-12 lg:px-24 bg-concrete">
            <div className="max-w-4xl mx-auto">
                <div className="mb-20 text-center">
                    <h2 className="font-heading font-bold text-4xl md:text-5xl text-industrial uppercase tracking-tight">The Crownwood Protocol</h2>
                    <div className="w-16 h-1 bg-safety-amber mx-auto mt-6" />
                </div>

                <div className="relative">
                    {PROTOCOLS.map((p, i) => (
                        <div
                            key={p.step}
                            className={`sticky top-[15vh] mb-12 last:mb-0 rounded-[2rem] p-8 md:p-12 shadow-2xl border border-black/5 ${p.color}`}
                            style={{ zIndex: i }}
                        >
                            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                                <div className="flex-shrink-0 w-24 h-24 rounded-full bg-black/10 flex items-center justify-center">
                                    <p.icon className="w-10 h-10" />
                                </div>
                                <div className="flex-1">
                                    <div className="font-mono text-sm font-bold tracking-widest opacity-60 mb-2">PHASE {p.step}</div>
                                    <h3 className="font-heading font-bold text-3xl uppercase tracking-wider mb-4">{p.title}</h3>
                                    <p className="font-sans text-lg opacity-80 leading-relaxed max-w-2xl">{p.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
