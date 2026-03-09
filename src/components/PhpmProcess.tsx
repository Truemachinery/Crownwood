"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shovel, Waves, Hammer, CarFront } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const MECHANISMS = [
    {
        num: "01",
        title: "Debris Removal",
        icon: Shovel,
        desc: "Sweep out large, loose chunks of asphalt or debris from the pothole. Unlike hot-mix repairs, you do not need to meticulously dry the hole, route the edges, or apply a separate tack-coat primer — PHPM50 acts as its own heatless tack oil that won't clog your lines and requires no suckback."
    },
    {
        num: "02",
        title: "Direct Application",
        icon: Waves,
        desc: "Dispense PHPM-50 directly from the 275-gallon tote into the void. If the hole is full of standing water, pour the polymer directly into the water. The heavier-than-water hydro-reactive formula will instantly displace the moisture and sink to the base."
    },
    {
        num: "03",
        title: "Overfill & Tamp",
        icon: Hammer,
        desc: "Fill the hole approximately half an inch above the surrounding pavement grade. Using a hand tamper, skid-steer tire, or vibratory plate, forcefully compact the material downward until it is flush."
    },
    {
        num: "04",
        title: "Immediate Traffic",
        icon: CarFront,
        desc: "The compaction triggers the final binding sequence. You can instantly remove safety cones and open the lane. Heavy vehicular traffic actually compresses the patch further, increasing its permanent density."
    }
];

export function PhpmProcess() {
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
        <section ref={containerRef} className="py-32 px-6 md:px-12 lg:px-24 bg-asphalt relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #CCFF00 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-24">
                    <h2 className="font-heading font-bold text-4xl md:text-5xl text-concrete uppercase tracking-tight mb-6 relative inline-block">
                        Zero-Prep <span className="text-high-vis-yellow font-drama italic">Deployment</span>
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-high-vis-yellow"></div>
                    </h2>
                    <p className="font-sans text-xl text-concrete/70 max-w-3xl mx-auto mt-8 leading-relaxed">
                        PHPM50 is a heatless tack oil designed for high-velocity maintenance crews. No heat required, no clogged lines, no suckback. Just dispense from the 275-gallon tote and go.
                    </p>
                </div>

                <div className="relative">
                    <div className="absolute left-12 md:left-1/2 top-0 bottom-0 w-1 bg-white/5 -translate-x-1/2 ml-[2px] md:ml-0 rounded-full">
                        <div ref={lineRef} className="w-full bg-high-vis-yellow rounded-full h-0 shadow-[0_0_15px_rgba(204,255,0,0.5)]"></div>
                    </div>

                    <div className="space-y-16 md:space-y-32">
                        {MECHANISMS.map((step, idx) => {
                            const isEven = idx % 2 === 0;
                            return (
                                <div key={step.num} className={`mechanism-step relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                                    <div className="absolute left-12 md:left-1/2 -translate-x-1/2 w-16 h-16 bg-[#1A1A1A] border-4 border-[#333333] rounded-full z-10 flex items-center justify-center shadow-xl group-hover:border-high-vis-yellow transition-colors">
                                        <span className="font-heading font-bold text-xl text-high-vis-yellow">{step.num}</span>
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
