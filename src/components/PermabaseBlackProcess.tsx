"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Truck, Blend, ShieldCheck, Sun } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const MECHANISMS = [
    {
        num: "01",
        title: "Catalytic Pigment Infusion",
        icon: Blend,
        desc: "The proprietary carbon-black pigment is pre-mixed with the active Permabase bio-enzyme catalyst in the water truck. This ensures the colorant is carried deep into the soil profile along with the chemical activator."
    },
    {
        num: "02",
        title: "Deep Lift Application",
        icon: Truck,
        desc: "As the soil is bladed and compacted in lifts, the black-tinted enzyme saturates the entire depth of the treated subgrade (typically 6 to 12 inches), rather than just sitting superficially on the surface like an emulsion."
    },
    {
        num: "03",
        title: "Hydrophobic Curing",
        icon: ShieldCheck,
        desc: "The bio-enzyme collapses the clay lattice, expelling water and permanently binding the soil particles together into a dense, solid, water-repellent matrix infused with the carbon pigment."
    },
    {
        num: "04",
        title: "UV-Resistant Finish",
        icon: Sun,
        desc: "Once fully cured and compacted, the surface solidifies into a flat, dark, aesthetic finish. The carbon-black tint is highly UV resistant, holding its deep color significantly longer than untreated dirt."
    }
];

export function PermabaseBlackProcess() {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const steps = gsap.utils.toArray('.mechanism-step');

        gsap.to(lineRef.current, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top center",
                end: "bottom center",
                scrub: 1,
            },
            height: "100%",
            ease: "none"
        });

        steps.forEach((step: any, i) => {
            gsap.from(step, {
                scrollTrigger: {
                    trigger: step,
                    start: "top 80%",
                },
                x: i % 2 === 0 ? -50 : 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-32 px-6 md:px-12 lg:px-24 bg-[#111111] relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #FFB300 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-24">
                    <h2 className="font-heading font-bold text-4xl md:text-5xl text-concrete uppercase tracking-tight mb-6 relative inline-block">
                        Application <span className="text-safety-amber font-drama italic">Protocol</span>
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-safety-amber"></div>
                    </h2>
                    <p className="font-sans text-xl text-concrete/70 max-w-3xl mx-auto mt-8 leading-relaxed">
                        Permabase Black requires the exact same operational footprint as our standard stabilization formula. You receive maximum structural integrity and a premium asphalt finish simultaneously.
                    </p>
                </div>

                <div className="relative">
                    <div className="absolute left-12 md:left-1/2 top-0 bottom-0 w-1 bg-white/5 -translate-x-1/2 ml-[2px] md:ml-0 rounded-full">
                        <div ref={lineRef} className="w-full bg-[#333333] rounded-full h-0 shadow-[0_0_15px_rgba(255,255,255,0.1)]"></div>
                    </div>

                    <div className="space-y-16 md:space-y-32">
                        {MECHANISMS.map((step, idx) => {
                            const isEven = idx % 2 === 0;
                            return (
                                <div key={step.num} className={`mechanism-step relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                                    <div className="absolute left-12 md:left-1/2 -translate-x-1/2 w-16 h-16 bg-[#1A1A1A] border-4 border-[#333333] rounded-full z-10 flex items-center justify-center shadow-xl">
                                        <span className="font-heading font-bold text-xl text-safety-amber">{step.num}</span>
                                    </div>

                                    <div className={`w-full md:w-1/2 pl-28 md:pl-0 ${isEven ? 'md:pr-24 text-left md:text-right' : 'md:pl-24 text-left'}`}>
                                        <div className="bg-white/5 backdrop-blur-md border border-white/5 p-8 rounded-3xl hover:bg-white/10 transition-colors group">
                                            <div className={`flex items-center gap-4 mb-4 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                                                <div className="w-12 h-12 rounded-xl bg-black/50 border border-white/10 text-concrete flex items-center justify-center shrink-0">
                                                    <step.icon className="w-6 h-6" />
                                                </div>
                                                <h3 className="font-heading font-bold text-2xl text-concrete uppercase tracking-wide">
                                                    {step.title}
                                                </h3>
                                            </div>
                                            <p className="font-sans text-concrete/70 text-lg leading-relaxed">
                                                {step.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
