"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shovel, ThermometerSun, Truck, RollerCoaster } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PROCESS_STEPS = [
    {
        num: "01",
        title: "Site Preparation & Excavation",
        icon: Shovel,
        desc: "We analyze the subgrade composition and determine the required excavation depth. Using heavy machinery, we remove failing asphalt, organic topsoil, and moisture-compromised base material down to solid, undisturbed earth."
    },
    {
        num: "02",
        title: "Subgrade Stabilization (Permabase)",
        icon: ThermometerSun,
        desc: "San Antonio's expansive clay soils destroy untreated pavement. We inject our proprietary Permabase chemical stabilizer deep into the subgrade, fundamentally altering the soil's molecular structure to prevent swelling, shrinking, and extreme moisture absorption."
    },
    {
        num: "03",
        title: "Base Rock Installation & Grading",
        icon: Truck,
        desc: "We import and install TxDOT Type A, Grade 1 or 2 crushed limestone base. Using laser-guided grading GPS technology, we establish perfect pitch and slope to ensure 100% positive water drainage away from the structure."
    },
    {
        num: "04",
        title: "Hot Mix Application & Compaction",
        icon: RollerCoaster, // Repurposing as a roller icon
        desc: "High-density hot mix asphalt, specifically engineered for extreme Texas thermal loads, is laid via tracked pavers. Vibratory steel-wheel and pneumatic tire rollers compact the mat to terminal density, achieving an impenetrable, monolithic surface."
    }
];

export function AsphaltProcess() {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const steps = gsap.utils.toArray('.process-step');

        // Draw the vertical line down
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

        // Fade in each step
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
                        The Crownwood <span className="text-safety-amber font-drama italic">Protocol</span>
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-safety-amber"></div>
                    </h2>
                    <p className="font-sans text-xl text-concrete/70 max-w-3xl mx-auto mt-8 leading-relaxed">
                        Excellence is not an accident. It is the result of strict adherence to our rigorous, internally developed paving methodology designed specifically to defeat South Texas soil and climate conditions.
                    </p>
                </div>

                <div className="relative">
                    {/* Vertical Connecting Line */}
                    <div className="absolute left-12 md:left-1/2 top-0 bottom-0 w-1 bg-white/10 -translate-x-1/2 ml-[2px] md:ml-0 rounded-full">
                        <div ref={lineRef} className="w-full bg-safety-amber rounded-full h-0 shadow-[0_0_15px_rgba(255,179,0,0.5)]"></div>
                    </div>

                    <div className="space-y-16 md:space-y-32">
                        {PROCESS_STEPS.map((step, idx) => {
                            const isEven = idx % 2 === 0;
                            return (
                                <div key={step.num} className={`process-step relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16 ${isEven ? 'md:flex-row-reverse' : ''}`}>

                                    {/* Number / Node */}
                                    <div className="absolute left-12 md:left-1/2 -translate-x-1/2 w-16 h-16 bg-asphalt border-4 border-safety-amber rounded-full z-10 flex items-center justify-center shadow-xl">
                                        <span className="font-heading font-bold text-xl text-safety-amber">{step.num}</span>
                                    </div>

                                    {/* Content Card */}
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
