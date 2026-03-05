"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, X, AlertTriangle, Minus } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const METHODS = [
    { name: "Permabase Black™", highlight: true },
    { name: "Lime Stabilization" },
    { name: "Hot-Mix Asphalt" },
    { name: "Calcium Chloride" },
];

const FACTORS = [
    {
        label: "Permanent Soil Stabilization",
        values: ["yes", "yes", "surface", "no"],
    },
    {
        label: "Dark Asphalt Aesthetic",
        values: ["yes", "no", "yes", "no"],
    },
    {
        label: "PM10 Dust Suppression",
        values: ["yes", "partial", "yes", "temporary"],
    },
    {
        label: "Environmentally Non-Toxic",
        values: ["yes", "warn", "no", "warn"],
    },
    {
        label: "Single-Pass Application",
        values: ["yes", "no", "no", "yes"],
    },
    {
        label: "Subgrade + Finish in One",
        values: ["yes", "no", "no", "no"],
    },
    {
        label: "Hydrophobic (Water-Repellent)",
        values: ["yes", "no", "yes", "no"],
    },
    {
        label: "Cost-Effective for Rural Roads",
        values: ["yes", "partial", "no", "temporary"],
    },
];

function CellIcon({ value }: { value: string }) {
    switch (value) {
        case "yes":
            return <Check className="w-5 h-5 text-emerald-500" />;
        case "no":
            return <X className="w-5 h-5 text-red-400" />;
        case "warn":
            return <AlertTriangle className="w-4 h-4 text-amber-400" />;
        case "partial":
            return <Minus className="w-5 h-5 text-amber-300" />;
        case "temporary":
            return <span className="text-xs text-amber-300 font-mono uppercase">Temp</span>;
        case "surface":
            return <span className="text-xs text-amber-300 font-mono uppercase">Surface</span>;
        default:
            return <span className="text-xs text-concrete/50">{value}</span>;
    }
}

export function PermabaseBlackComparison() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(".comparison-table", {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            },
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-24 px-6 md:px-12 lg:px-24 bg-concrete relative">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="font-heading font-bold text-4xl md:text-5xl text-industrial uppercase tracking-tight mb-6">
                        Polymer Soil Stabilization <span className="text-safety-amber">vs. Traditional Methods</span>
                    </h2>
                    <p className="font-sans text-xl text-industrial/70 max-w-3xl mx-auto leading-relaxed">
                        See how Permabase Black&apos;s polymer bio-enzyme soil stabilization technology compares to conventional road building and dust control methods.
                    </p>
                </div>

                <div className="comparison-table overflow-x-auto rounded-2xl border border-black/10 shadow-xl bg-white">
                    <table className="w-full text-left min-w-[640px]">
                        <thead>
                            <tr className="border-b border-black/10">
                                <th className="p-5 font-heading font-bold text-sm text-industrial/60 uppercase tracking-widest">Factor</th>
                                {METHODS.map((m) => (
                                    <th key={m.name} className={`p-5 text-center font-heading font-bold text-sm uppercase tracking-wider ${m.highlight ? 'bg-asphalt text-safety-amber' : 'text-industrial/80'}`}>
                                        {m.name}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {FACTORS.map((factor, idx) => (
                                <tr key={factor.label} className={`border-b border-black/5 ${idx % 2 === 0 ? 'bg-white' : 'bg-industrial/[0.02]'}`}>
                                    <td className="p-5 font-sans text-industrial font-medium text-sm">{factor.label}</td>
                                    {factor.values.map((val, vi) => (
                                        <td key={vi} className={`p-5 text-center ${vi === 0 ? 'bg-asphalt/5' : ''}`}>
                                            <div className="flex justify-center">
                                                <CellIcon value={val} />
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
