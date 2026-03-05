"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FlaskConical, Droplet, Sprout, Sun } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PROCESS_STEPS = [
    {
        num: "01",
        title: "Slurry Formulation",
        icon: FlaskConical,
        desc: "We analyze the commercial site's soil pH and sun exposure to engineer a custom slurry. This proprietary matrix combines drought-resistant native seed, fast-acting fertilizers, wood/cellulose mulch, and heavy-duty mucilage tackifiers within our hydro-seeder tank."
    },
    {
        num: "02",
        title: "High-Pressure Application",
        icon: Droplet,
        desc: "Using industrial cannons and specialized hoses, we blast the slurry directly onto graded pad sites, slopes, and retention ponds. The tackifier acts like a glue, instantly locking the seed, mulch, and soil in place to prevent sheet erosion during rain."
    },
    {
        num: "03",
        title: "Moisture Incubation",
        icon: Sprout,
        desc: "The wood and cellulose mulch fiber forms a protective, moisture-retaining blanket over the seed. This micro-greenhouse effect traps humidity, shields the seed from Texas sun baking, and dramatically accelerates the germination timeline compared to dry broadcasting."
    },
    {
        num: "04",
        title: "Root Establishment",
        icon: Sun,
        desc: "Within 7 to 14 days, the seed germinates directly into the native soil. Unlike sod, which suffers from transplant shock and shallow rooting, hydro-seeded grass drives deep taproots, establishing a permanent, drought-tolerant biological erosion control system."
    }
];

export function HydroSeedingProcess() {
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
                        Deployment <span className="text-[#4CAF50] font-drama italic">Protocol</span>
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-[#4CAF50]"></div>
                    </h2>
                    <p className="font-sans text-xl text-concrete/70 max-w-3xl mx-auto mt-8 leading-relaxed">
                        We don't just throw seed. We engineer a biological matrix designed to survive extreme Texas environments and immediately halt site erosion.
                    </p>
                </div>

                <div className="relative">
                    <div className="absolute left-12 md:left-1/2 top-0 bottom-0 w-1 bg-white/10 -translate-x-1/2 ml-[2px] md:ml-0 rounded-full">
                        <div ref={lineRef} className="w-full bg-[#4CAF50] rounded-full h-0 shadow-[0_0_15px_rgba(76,175,80,0.5)]"></div>
                    </div>

                    <div className="space-y-16 md:space-y-32">
                        {PROCESS_STEPS.map((step, idx) => {
                            const isEven = idx % 2 === 0;
                            return (
                                <div key={step.num} className={`process-step relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                                    <div className="absolute left-12 md:left-1/2 -translate-x-1/2 w-16 h-16 bg-asphalt border-4 border-[#4CAF50] rounded-full z-10 flex items-center justify-center shadow-xl">
                                        <span className="font-heading font-bold text-xl text-[#4CAF50]">{step.num}</span>
                                    </div>

                                    <div className={`w-full md:w-1/2 pl-28 md:pl-0 ${isEven ? 'md:pr-24 text-left md:text-right' : 'md:pl-24 text-left'}`}>
                                        <div className="bg-concrete/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-concrete/10 transition-colors group">
                                            <div className={`flex items-center gap-4 mb-4 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                                                <div className="w-12 h-12 rounded-xl bg-[#4CAF50]/20 text-[#4CAF50] flex items-center justify-center shrink-0">
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
