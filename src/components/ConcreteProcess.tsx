"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DraftingCompass, Shovel, Layers, Blocks } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PROCESS_STEPS = [
    {
        num: "01",
        title: "Subgrade Engineering",
        icon: Shovel,
        desc: "Without a stabilized base, massive concrete slabs will crack under Texas soil shifts. We excavate failing soil and inject Permabase chemical stabilizer, converting expansive clay into a rigid, impenetrable moisture barrier."
    },
    {
        num: "02",
        title: "Steel Reinforcement Grid",
        icon: DraftingCompass, // Reusing as a forming/grid metaphor
        desc: "We construct dense, tied rebar grids elevated on chairs to sit precisely in the center third of the slab. This steel armature provides the massive tensile strength required to prevent structural separation when placed under point-loads."
    },
    {
        num: "03",
        title: "Precision Pour & Vibration",
        icon: Layers,
        desc: "We utilize high-PSI, state-approved concrete mixes. During the pour, we deploy mechanical vibrators throughout the wet mix to eradicate trapped air pockets, ensuring maximum aggregate density and preventing internal honeycombing."
    },
    {
        num: "04",
        title: "Tooling & Curing Protocol",
        icon: Blocks,
        desc: "Expansion joints are hand-tooled or saw-cut at mathematically calculated intervals to control inevitable thermal expansion. The surface is broom-finished for traction, and a chemical curing compound is applied to prevent rapid moisture loss."
    }
];

export function ConcreteProcess() {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const steps = gsap.utils.toArray('.process-step');

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
        <section ref={containerRef} className="py-32 px-6 md:px-12 lg:px-24 bg-asphalt relative overflow-hidden">
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-24">
                    <h2 className="font-heading font-bold text-4xl md:text-5xl text-concrete uppercase tracking-tight mb-6 relative inline-block">
                        Execution <span className="text-safety-amber font-drama italic">Protocol</span>
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-safety-amber"></div>
                    </h2>
                    <p className="font-sans text-xl text-concrete/70 max-w-3xl mx-auto mt-8 leading-relaxed">
                        Concrete is permanent. A flawed pour is a catastrophic failure. Our protocol ensures structural integrity before the first truck even arrives.
                    </p>
                </div>

                <div className="relative">
                    <div className="absolute left-12 md:left-1/2 top-0 bottom-0 w-1 bg-white/10 -translate-x-1/2 ml-[2px] md:ml-0 rounded-full">
                        <div ref={lineRef} className="w-full bg-safety-amber rounded-full h-0 shadow-[0_0_15px_rgba(255,179,0,0.5)]"></div>
                    </div>

                    <div className="space-y-16 md:space-y-32">
                        {PROCESS_STEPS.map((step, idx) => {
                            const isEven = idx % 2 === 0;
                            return (
                                <div key={step.num} className={`process-step relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                                    <div className="absolute left-12 md:left-1/2 -translate-x-1/2 w-16 h-16 bg-asphalt border-4 border-safety-amber rounded-full z-10 flex items-center justify-center shadow-xl">
                                        <span className="font-heading font-bold text-xl text-safety-amber">{step.num}</span>
                                    </div>

                                    <div className={`w-full md:w-1/2 pl-28 md:pl-0 ${isEven ? 'md:pr-24 text-left md:text-right' : 'md:pl-24 text-left'}`}>
                                        <div className="bg-concrete/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-concrete/10 transition-colors group">
                                            <div className={`flex items-center gap-4 mb-4 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                                                <div className="w-12 h-12 rounded-xl bg-safety-amber/20 text-safety-amber flex items-center justify-center shrink-0">
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
